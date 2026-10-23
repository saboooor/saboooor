import { sql } from 'drizzle-orm';
import { type AppDatabase } from '~/util/db';

export interface MusicActivity {
  id?: string;
  type: number;
  name: string;
  details?: string;
  state?: string;
  assets?: Record<string, string>;
  timestamps?: { start?: number; end?: number };
  lastPlayed?: boolean;
}

export interface MusicPlay {
  id: string;
  activity: MusicActivity;
  caughtAt: number;
  likes: number;
  liked: boolean;
}

export function musicIdentity(activity?: MusicActivity | null) {
  return activity?.details
    ? JSON.stringify([
        activity.details,
        activity.state || '',
        activity.assets?.large_text || '',
      ])
    : '';
}

export function musicSessionIdentity(activity?: MusicActivity | null) {
  const song = musicIdentity(activity);
  return song ? `${song}:${activity?.timestamps?.start || ''}` : '';
}

// UTC day keys keep storage, migration, and pagination boundaries identical.
export function musicDate(caughtAt: number) {
  return new Date(caughtAt).toISOString().slice(0, 10);
}

export async function catchMusic(db: AppDatabase, current?: MusicActivity) {
  if (!current?.details) return;
  const id = musicIdentity(current);
  const caughtAt = Date.now();
  const date = musicDate(caughtAt);
  const activity: MusicActivity = {
    type: 2,
    name: current.name,
    details: current.details,
    state: current.state,
    assets: current.assets,
    lastPlayed: true,
  };
  const entry = JSON.stringify({
    id,
    activity,
    caughtAt,
    session: musicSessionIdentity(current),
  });
  // One entry per song per day; duplicate detections never rewrite the day.
  await db.run(sql`
    INSERT INTO music_days (date, songs_json) VALUES (${date}, json_array(json(${entry})))
    ON CONFLICT(date) DO UPDATE SET songs_json = json_insert(music_days.songs_json, '$[#]', json(${entry}))
    WHERE NOT EXISTS (
      SELECT 1 FROM json_each(music_days.songs_json)
      WHERE json_extract(value, '$.id') = ${id}
    )
  `);
}

type StoredPlay = Pick<MusicPlay, 'id' | 'activity' | 'caughtAt'>;

export async function musicHistory(
  db: AppDatabase,
  visitor: string,
  before?: string,
  mostLiked = false
): Promise<MusicPlay[]> {
  if (mostLiked) {
    const rows = await db.all<{
      id: string;
      activity: string;
      caughtAt: number;
      likes: number;
      liked: number;
    }>(sql`
      SELECT song_key AS id, activity_json AS activity, max(caught_at) AS caughtAt,
        count(*) AS likes, max(visitor_id = ${visitor}) AS liked
      FROM music_favorites GROUP BY song_key
      ORDER BY likes DESC, caughtAt DESC, song_key LIMIT 10
    `);
    return rows.map((row) => ({
      ...row,
      activity: JSON.parse(row.activity),
      liked: Boolean(row.liked),
    }));
  }
  const days = await db.all<{ songs: string }>(sql`
    SELECT songs_json AS songs FROM music_days
    WHERE date < ${before || '9999-12-31'} ORDER BY date DESC LIMIT 1
  `);
  if (!days[0]) return [];
  const plays = (JSON.parse(days[0].songs) as StoredPlay[]).sort(
    (a, b) => b.caughtAt - a.caughtAt
  );
  const keys = JSON.stringify(plays.map((play) => play.id));
  if (!plays.length) return [];
  const likes = await db.all<{ id: string; likes: number; liked: number }>(sql`
    SELECT song_key AS id, count(*) AS likes, max(visitor_id = ${visitor}) AS liked
    FROM music_favorites WHERE song_key IN (SELECT value FROM json_each(${keys})) GROUP BY song_key
  `);
  const counts = new Map(likes.map((row) => [row.id, row]));
  return plays.map((play) => ({
    ...play,
    activity: { ...play.activity, id: play.id },
    likes: counts.get(play.id)?.likes || 0,
    liked: Boolean(counts.get(play.id)?.liked),
  }));
}

export async function likeMusic(db: AppDatabase, id: string, visitor: string) {
  if (typeof id !== 'string' || !id || id.length > 10000)
    throw new Error('Invalid song');
  await db.run(sql`
    INSERT INTO music_favorites (song_key, visitor_id, activity_json, caught_at)
    SELECT ${id}, ${visitor}, json_extract(value, '$.activity'), json_extract(value, '$.caughtAt')
    FROM music_days, json_each(songs_json)
    WHERE json_extract(value, '$.id') = ${id}
    ORDER BY date DESC LIMIT 1
    ON CONFLICT DO NOTHING
  `);
  const rows = await db.all<{ likes: number }>(sql`
    SELECT count(*) AS likes FROM music_favorites WHERE song_key = ${id}
  `);
  return rows[0]?.likes || 0;
}
