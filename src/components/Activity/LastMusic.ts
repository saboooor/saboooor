import {
  and,
  countDistinct,
  desc,
  eq,
  exists,
  gt,
  lt,
  max,
  sql,
} from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';
import { musicPlays, musicLikes, type AppDatabase } from '~/util/db';

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
  id: number;
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

export async function catchMusic(db: AppDatabase, current?: MusicActivity) {
  if (!current?.details) return;
  const identity = musicIdentity(current);
  const session = current.timestamps?.start
    ? `${identity}:${current.timestamps.start}`
    : null;
  const song: MusicActivity = {
    type: 2,
    name: current.name,
    details: current.details,
    state: current.state,
    assets: current.assets,
    lastPlayed: true,
  };
  const latestSong = db
    .select({ songKey: musicPlays.songKey })
    .from(musicPlays)
    .orderBy(desc(musicPlays.id))
    .limit(1);
  // Keep the conditional insert atomic, including detections without a start time.
  await db
    .insert(musicPlays)
    .select(sql`
    SELECT NULL, ${identity}, ${session}, ${JSON.stringify(song)}, ${Date.now()}
    WHERE ${session} IS NOT NULL OR coalesce((${latestSong}), '') != ${identity}
  `)
    .onConflictDoNothing();
}

function songLikes(db: AppDatabase) {
  const likedPlay = alias(musicPlays, 'liked_play');
  return db
    .select({ count: countDistinct(musicLikes.visitorId) })
    .from(musicLikes)
    .innerJoin(likedPlay, eq(likedPlay.id, musicLikes.playId))
    .where(eq(likedPlay.songKey, musicPlays.songKey));
}

export async function musicHistory(
  db: AppDatabase,
  visitor: string,
  before?: number,
  mostLiked = false
): Promise<MusicPlay[]> {
  const latest = alias(musicPlays, 'latest');
  const likedPlay = alias(musicPlays, 'visitor_play');
  const latestId = db
    .select({ id: max(latest.id) })
    .from(latest)
    .where(eq(latest.songKey, musicPlays.songKey));
  const visitorLike = db
    .select({ value: sql`1` })
    .from(musicLikes)
    .innerJoin(likedPlay, eq(likedPlay.id, musicLikes.playId))
    .where(
      and(
        eq(likedPlay.songKey, musicPlays.songKey),
        eq(musicLikes.visitorId, visitor)
      )
    );
  const likes = sql<number>`(${songLikes(db)})`.mapWith(Number);
  const rows = await db
    .select({
      id: musicPlays.id,
      activity: musicPlays.activity,
      caughtAt: musicPlays.caughtAt,
      likes,
      liked: sql<boolean>`${exists(visitorLike)}`.mapWith(Boolean),
    })
    .from(musicPlays)
    .where(
      and(
        eq(musicPlays.id, latestId),
        lt(musicPlays.id, before || Number.MAX_SAFE_INTEGER),
        mostLiked ? gt(likes, 0) : undefined
      )
    )
    .orderBy(
      ...(mostLiked
        ? [desc(likes), desc(musicPlays.id)]
        : [desc(musicPlays.id)])
    )
    .limit(mostLiked ? 10 : 50);
  return rows.map((row) => ({
    ...row,
    activity: { ...row.activity, id: `music-play-${row.id}` },
  }));
}

export async function likeMusic(db: AppDatabase, id: number, visitor: string) {
  if (!Number.isSafeInteger(id) || id < 1) throw new Error('Invalid song');
  const target = alias(musicPlays, 'target_play');
  const songKey = db
    .select({ songKey: target.songKey })
    .from(target)
    .where(eq(target.id, id));
  const [_, counts] = await db.batch([
    db
      .insert(musicLikes)
      .select(
        db
          .select({
            playId: sql<number>`min(${musicPlays.id})`.as('play_id'),
            visitorId: sql<string>`${visitor}`.as('visitor_id'),
          })
          .from(musicPlays)
          .where(eq(musicPlays.songKey, songKey))
          .having(sql`count(*) > 0`)
      )
      .onConflictDoNothing(),
    db
      .select({ likes: countDistinct(musicLikes.visitorId) })
      .from(musicLikes)
      .innerJoin(musicPlays, eq(musicPlays.id, musicLikes.playId))
      .where(eq(musicPlays.songKey, songKey)),
  ]);
  return counts[0]?.likes || 0;
}
