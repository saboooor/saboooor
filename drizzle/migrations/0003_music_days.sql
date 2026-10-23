CREATE TABLE music_days (
  date TEXT PRIMARY KEY NOT NULL,
  songs_json TEXT NOT NULL
);
CREATE TABLE music_favorites (
  song_key TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  activity_json TEXT NOT NULL,
  caught_at INTEGER NOT NULL,
  PRIMARY KEY (song_key, visitor_id)
);

INSERT INTO music_days (date, songs_json)
SELECT date(caught_at / 1000, 'unixepoch'),
  json_group_array(json_object('id', song_key, 'activity', json(activity_json), 'caughtAt', caught_at))
FROM music_plays
WHERE id IN (
  SELECT max(id) FROM music_plays GROUP BY date(caught_at / 1000, 'unixepoch'), song_key
)
GROUP BY date(caught_at / 1000, 'unixepoch');

INSERT INTO music_favorites (song_key, visitor_id, activity_json, caught_at)
SELECT p.song_key, l.visitor_id, p.activity_json, max(p.caught_at)
FROM music_likes l JOIN music_plays p ON p.id = l.play_id
GROUP BY p.song_key, l.visitor_id;

DROP TABLE music_likes;
DROP TABLE music_plays;
