import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../../drizzle/schema';
import { afterEach, expect, it } from 'vite-plus/test';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { catchMusic, musicHistory, likeMusic, type MusicActivity } from './LastMusic';

const connections: DatabaseSync[] = [];
afterEach(() => connections.splice(0).forEach((db) => db.close()));
function database() {
  const sql = new DatabaseSync(':memory:');
  connections.push(sql);
  sql.exec(readFileSync('drizzle/migrations/0001_music_history.sql', 'utf8'));
  sql.exec(readFileSync('drizzle/migrations/0002_music_song_index.sql', 'utf8'));
  const prepare = (query: string) => {
    let values: (string | number | null)[] = [];
    const statement = {
      bind(...args: (string | number | null)[]) { values = args; return statement; },
      async run() { sql.prepare(query).run(...values); return { success: true }; },
      async all() { return { results: sql.prepare(query).all(...values), success: true }; },
      async raw() { const compiled = sql.prepare(query); compiled.setReturnArrays(true); return compiled.all(...values); },
    };
    return statement;
  };
  const client = { prepare, async batch(statements: ReturnType<typeof prepare>[]) {
    return Promise.all(statements.map(async (statement, index) => statement.all()));
  } } as unknown as D1Database;
  return drizzle(client, { schema });
}
const song: MusicActivity = { type: 2, name: 'Apple Music', details: 'Song', state: 'Artist', assets: { large_text: 'Album' }, timestamps: { start: 100, end: 200 } };

it('logs one caught timestamp for repeated detections of a playback session', async () => {
  const db = database();
  const before = Date.now();
  await catchMusic(db, song);
  await catchMusic(db, song);
  await catchMusic(db);
  const entries = await musicHistory(db, 'visitor');
  expect(entries).toHaveLength(1);
  expect(entries[0].caughtAt).toBeGreaterThanOrEqual(before);
  expect(entries[0].activity).not.toHaveProperty('timestamps');
  expect(entries[0].activity.lastPlayed).toBe(true);
});

it('shows only the latest play per song, including across history pages', async () => {
  const db = database();
  await catchMusic(db, song);
  await catchMusic(db, { ...song, details: 'Another song', timestamps: { start: 250 } });
  await catchMusic(db, { ...song, timestamps: { start: 300 } });
  const entries = await musicHistory(db, 'visitor');
  expect(entries).toHaveLength(2);
  expect(entries[0].activity.details).toBe('Song');
  expect(entries[1].activity.details).toBe('Another song');
  expect(entries[0].id).toBeGreaterThan(entries[1].id);
  expect(await musicHistory(db, 'visitor', entries[0].id)).toHaveLength(1);
});

it('deduplicates consecutive detections without a playback start', async () => {
  const db = database();
  await catchMusic(db, { ...song, timestamps: undefined });
  await catchMusic(db, { ...song, timestamps: undefined });
  await catchMusic(db, { ...song, details: 'Another song', timestamps: undefined });
  await catchMusic(db, { ...song, timestamps: undefined });
  expect(await musicHistory(db, 'visitor')).toHaveLength(2);
});

it('counts only one like per visitor per entry', async () => {
  const db = database();
  await catchMusic(db, song);
  const [play] = await musicHistory(db, 'a');
  expect(await likeMusic(db, play.id, 'a')).toBe(1);
  expect(await likeMusic(db, play.id, 'a')).toBe(1);
  expect(await likeMusic(db, play.id, 'b')).toBe(2);
  expect((await musicHistory(db, 'a'))[0]).toMatchObject({ likes: 2, liked: true });
  expect((await musicHistory(db, 'c'))[0].liked).toBe(false);
});

it('preserves likes across repeat plays without counting a visitor twice', async () => {
  const db = database();
  await catchMusic(db, song);
  const [original] = await musicHistory(db, 'a');
  await likeMusic(db, original.id, 'a');
  await catchMusic(db, { ...song, timestamps: { start: 400 } });
  const [latest] = await musicHistory(db, 'a');
  expect(latest.id).not.toBe(original.id);
  expect(latest).toMatchObject({ likes: 1, liked: true });
  expect(await likeMusic(db, latest.id, 'a')).toBe(1);
  expect(await likeMusic(db, latest.id, 'b')).toBe(2);
});

it('ranks liked songs across all history, including beyond the recent page', async () => {
  const db = database();
  await catchMusic(db, song);
  const [oldest] = await musicHistory(db, 'visitor');
  await likeMusic(db, oldest.id, 'a');
  await likeMusic(db, oldest.id, 'b');
  for (let index = 0; index < 51; index++) {
    await catchMusic(db, { ...song, details: `Song ${index}`, timestamps: { start: 500 + index } });
  }
  const recent = await musicHistory(db, 'visitor');
  expect(recent.some((entry) => entry.id === oldest.id)).toBe(false);
  await likeMusic(db, recent[0].id, 'a');
  const ranked = await musicHistory(db, 'a', undefined, true);
  expect(ranked.map((entry) => entry.id)).toEqual([oldest.id, recent[0].id]);
  expect(ranked[0]).toMatchObject({ likes: 2, liked: true });
});
