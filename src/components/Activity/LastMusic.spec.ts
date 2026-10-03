import { expect, it, vi } from 'vite-plus/test';
import { syncLastMusic, type MusicActivity } from './LastMusic';

const song: MusicActivity = {
  type: 2,
  name: 'Apple Music',
  details: 'Song',
  state: 'Artist',
  assets: { large_text: 'Album' },
};

function mockKv(saved: MusicActivity | null) {
  const get = vi.fn().mockResolvedValue(saved);
  const put = vi.fn().mockResolvedValue(undefined);
  return { kv: { get, put } as unknown as Env['waves'], get, put };
}

it('returns the saved song when music is stopped without writing', async () => {
  const { kv, put } = mockKv(song);
  expect(await syncLastMusic(kv)).toEqual(song);
  expect(put).not.toHaveBeenCalled();
});

it('does not rewrite the same song when presence metadata changes', async () => {
  const { kv, put } = mockKv(song);
  await syncLastMusic(kv, { ...song, id: 'new-presence-id', name: 'Spotify' });
  expect(put).not.toHaveBeenCalled();
});

it('saves a different song without its live playback timestamps', async () => {
  const { kv, put } = mockKv(song);
  const current = { ...song, state: 'Different Artist', timestamps: { start: 123 } };
  const saved = await syncLastMusic(kv, current);
  expect(saved?.state).toBe('Different Artist');
  expect(saved?.lastPlayed).toBe(true);
  expect(saved).not.toHaveProperty('timestamps');
  expect(put).toHaveBeenCalledWith('last-played-song', JSON.stringify(saved));
});
