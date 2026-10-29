import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import type {
  MusicPlay,
  MusicActivity,
} from '../src/components/Activity/LastMusic';

export const musicDays = sqliteTable('music_days', {
  date: text('date').primaryKey(),
  songs: text('songs_json', { mode: 'json' })
    .$type<Pick<MusicPlay, 'id' | 'activity' | 'caughtAt'>[]>()
    .notNull(),
});

export const musicSessions = sqliteTable(
  'music_sessions',
  {
    sessionKey: text('session_key').primaryKey(),
    songKey: text('song_key').notNull(),
    activity: text('activity_json', { mode: 'json' })
      .$type<MusicActivity>()
      .notNull(),
    caughtAt: integer('caught_at').notNull(),
  },
  (table) => [index('music_sessions_song_key_idx').on(table.songKey)]
);
