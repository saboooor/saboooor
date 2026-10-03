export interface MusicActivity {
  id?: string;
  type: number;
  name: string;
  details?: string;
  state?: string;
  assets?: Record<string, string>;
  lastPlayed?: boolean;
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

export async function syncLastMusic(
  kv: Env['waves'] | undefined,
  current?: MusicActivity
): Promise<MusicActivity | null> {
  if (!kv) return current ? { ...current, lastPlayed: true } : null;
  const saved = await kv.get<MusicActivity>('last-played-song', 'json');
  if (!current?.details) return saved;
  if (musicIdentity(saved) === musicIdentity(current)) return saved;

  // Keep song metadata, without live presence timestamps or playback progress.
  const song: MusicActivity = {
    id: 'last-played-song',
    type: 2,
    name: current.name,
    details: current.details,
    state: current.state,
    assets: current.assets,
    lastPlayed: true,
  };
  await kv.put('last-played-song', JSON.stringify(song));
  return song;
}
