CREATE TABLE music_plays (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  song_key TEXT NOT NULL,
  session_key TEXT UNIQUE,
  activity_json TEXT NOT NULL,
  caught_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE INDEX music_plays_recent ON music_plays(id DESC);
--> statement-breakpoint
CREATE TABLE music_likes (
  play_id INTEGER NOT NULL REFERENCES music_plays(id) ON DELETE CASCADE,
  visitor_id TEXT NOT NULL,
  PRIMARY KEY (play_id, visitor_id)
);
