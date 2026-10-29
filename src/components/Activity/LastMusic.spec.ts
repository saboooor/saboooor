import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../../drizzle/schema';
import { afterEach, expect, it, vi } from 'vite-plus/test';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { catchMusic, musicHistory, type MusicActivity } from './LastMusic';

const connections: DatabaseSync[] = [];
afterEach(() => { vi.restoreAllMocks(); connections.splice(0).forEach((db) => db.close()); });
function database(seed = false) {
  const sql = new DatabaseSync(':memory:');
  connections.push(sql);
  sql.exec(readFileSync('drizzle/migrations/0001_music_history.sql', 'utf8'));
  sql.exec(readFileSync('drizzle/migrations/0002_music_song_index.sql', 'utf8'));
  if (seed) {
    const insert = sql.prepare('INSERT INTO music_plays (song_key, session_key, activity_json, caught_at) VALUES (?, ?, ?, ?)');
    insert.run(JSON.stringify(['Song', 'Artist', 'Album']), 'session1', JSON.stringify(song), Date.parse('2026-10-20T12:00:00Z'));
    insert.run(JSON.stringify(['Song', 'Artist', 'Album']), 'session2', JSON.stringify(song), Date.parse('2026-10-20T14:00:00Z'));
    sql.exec("INSERT INTO music_likes VALUES (1, 'a'), (2, 'a'), (2, 'b')");
  }
  sql.exec(readFileSync('drizzle/migrations/0003_music_days.sql', 'utf8'));
  sql.exec(readFileSync('drizzle/migrations/0004_music_play_counts.sql', 'utf8'));
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
  const entries = await musicHistory(db);
  expect(entries).toHaveLength(1);
  expect(entries[0].caughtAt).toBeGreaterThanOrEqual(before);
  expect(entries[0].activity).not.toHaveProperty('timestamps');
  expect(entries[0].activity.lastPlayed).toBe(true);
});

it('stores all songs for a date in one row and paginates complete dates', async () => {
  const db = database();
  const now = vi.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-10-20T12:00:00Z'));
  await catchMusic(db, song);
  now.mockReturnValue(Date.parse('2026-10-21T12:00:00Z'));
  for (let index = 0; index < 60; index++) {
    await catchMusic(db, { ...song, details: `Song ${index}` });
  }
  const entries = await musicHistory(db);
  expect(entries).toHaveLength(60);
  expect(await db.select().from(schema.musicDays)).toHaveLength(2);
  const older = await musicHistory(db, '2026-10-21');
  expect(older).toHaveLength(1);
  expect(older[0].activity.details).toBe('Song');
  expect(await musicHistory(db, '2026-10-20')).toEqual([]);
});

it('deduplicates consecutive detections without a playback start', async () => {
  const db = database();
  await catchMusic(db, { ...song, timestamps: undefined });
  await catchMusic(db, { ...song, timestamps: undefined });
  await catchMusic(db, { ...song, details: 'Another song', timestamps: undefined });
  await catchMusic(db, { ...song, timestamps: undefined });
  expect(await musicHistory(db)).toHaveLength(2);
});

it('counts distinct playback sessions while retaining one daily history entry', async () => {
  const db = database();
  await catchMusic(db, song);
  await catchMusic(db, song);
  await catchMusic(db, { ...song, timestamps: { start: 400 } });
  const entries = await musicHistory(db);
  expect(entries).toHaveLength(1);
  expect(entries[0].plays).toBe(2);
  vi.spyOn(Date, 'now').mockReturnValue(Date.now() + 86400000);
  await catchMusic(db, { ...song, timestamps: { start: 400 } });
  expect((await musicHistory(db))[0].plays).toBe(2);
  await catchMusic(db, { ...song, timestamps: { start: 500 } });
  expect((await musicHistory(db))[0].plays).toBe(3);
});

it('ranks songs across all history, including beyond the recent page', async () => {
  const db = database();
  await catchMusic(db, song);
  await catchMusic(db, { ...song, timestamps: { start: 400 } });
  const [oldest] = await musicHistory(db);
  vi.spyOn(Date, 'now').mockReturnValue(Date.now() + 86400000);
  for (let index = 0; index < 51; index++) {
    await catchMusic(db, { ...song, details: `Song ${index}`, timestamps: { start: 500 + index } });
  }
  expect((await musicHistory(db)).some((entry) => entry.id === oldest.id)).toBe(false);
  const ranked = await musicHistory(db, undefined, true);
  expect(ranked).toHaveLength(10);
  expect(ranked[0]).toMatchObject({ id: oldest.id, plays: 2 });
});

it('migrates retained history to plays and removes stored likes', async () => {
  const db = database(true);
  const entries = await musicHistory(db);
  expect(entries).toHaveLength(1);
  expect(entries[0]).toMatchObject({ caughtAt: Date.parse('2026-10-20T14:00:00Z'), plays: 1 });
  expect(await db.select().from(schema.musicDays)).toHaveLength(1);
  expect(connections[connections.length - 1].prepare("SELECT name FROM sqlite_master WHERE name = 'music_favorites'").all()).toEqual([]);
});
