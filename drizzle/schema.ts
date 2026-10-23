import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core';
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

export const musicFavorites = sqliteTable(
  'music_favorites',
  {
    songKey: text('song_key').notNull(),
    visitorId: text('visitor_id').notNull(),
    activity: text('activity_json', { mode: 'json' })
      .$type<MusicActivity>()
      .notNull(),
    caughtAt: integer('caught_at').notNull(),
  },
  (table) => [primaryKey({ columns: [table.songKey, table.visitorId] })]
);
