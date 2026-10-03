import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core';
import type { MusicActivity } from '../src/components/Activity/LastMusic';

export const musicPlays = sqliteTable(
  'music_plays',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    songKey: text('song_key').notNull(),
    sessionKey: text('session_key').unique(),
    activity: text('activity_json', { mode: 'json' })
      .$type<MusicActivity>()
      .notNull(),
    caughtAt: integer('caught_at').notNull(),
  },
  (table) => [
    index('music_plays_recent').on(table.id),
    index('music_plays_song_recent').on(table.songKey, table.id),
  ]
);

export const musicLikes = sqliteTable(
  'music_likes',
  {
    playId: integer('play_id')
      .notNull()
      .references(() => musicPlays.id, { onDelete: 'cascade' }),
    visitorId: text('visitor_id').notNull(),
  },
  (table) => [primaryKey({ columns: [table.playId, table.visitorId] })]
);
