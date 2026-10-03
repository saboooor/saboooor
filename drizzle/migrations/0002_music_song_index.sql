CREATE INDEX IF NOT EXISTS music_plays_song_recent ON music_plays(song_key, id DESC);
