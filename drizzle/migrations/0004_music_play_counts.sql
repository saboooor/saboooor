CREATE TABLE music_sessions (
  session_key TEXT PRIMARY KEY NOT NULL,
  song_key TEXT NOT NULL,
  activity_json TEXT NOT NULL,
  caught_at INTEGER NOT NULL
);
CREATE INDEX music_sessions_song_key_idx ON music_sessions (song_key);

-- Older history retained only one entry per song per day.
INSERT INTO music_sessions (session_key, song_key, activity_json, caught_at)
SELECT COALESCE(json_extract(value, '$.session'), json_extract(value, '$.id') || ':' || date),
  json_extract(value, '$.id'), json_extract(value, '$.activity'), json_extract(value, '$.caughtAt')
FROM music_days, json_each(songs_json)
WHERE true
ON CONFLICT(session_key) DO NOTHING;

DROP TABLE music_favorites;
