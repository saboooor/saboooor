import { component$, useContext, useSignal, useTask$ } from '@qwik.dev/core';
import Heart from 'lucide-icons-qwik/icons/Heart';
import type { MusicPlay } from './LastMusic';
import {
  likeSong,
  loadMostLikedMusic,
  MusicHistoryContext,
  MostLikedMusicContext,
} from '~/routes/layout';
import { musicIdentity } from './LastMusic';

export default component$<{ play: MusicPlay; hideDate?: boolean }>(
  ({ play, hideDate }) => {
    const liked = useSignal(play.liked);
    const likes = useSignal(play.likes);
    const busy = useSignal(false);
    const error = useSignal('');
    const history = useContext(MusicHistoryContext);
    const mostLiked = useContext(MostLikedMusicContext);
    useTask$(({ track }) => {
      likes.value = track(() => play.likes);
      liked.value = track(() => play.liked);
    });
    return (
      <div class="flex flex-col items-end gap-3 text-xs text-gray-400">
        {!hideDate && (
          <p class="text-nowrap">
            <time dateTime={new Date(play.caughtAt).toISOString()}>
              {new Intl.DateTimeFormat('en-CA', {
                dateStyle: undefined,
                timeStyle: 'short',
              }).format(play.caughtAt)}{' '}
            </time>
          </p>
        )}
        <button
          type="button"
          class={{
            'lum-btn lum-btn-p-1 lum-bg-gray-900/50 rounded-lum-4 flex items-center gap-2': true,
            'text-pink-300': liked.value,
          }}
          aria-label={`Like ${play.activity.details}, ${likes.value} likes`}
          aria-pressed={liked.value}
          disabled={busy.value || liked.value}
          onClick$={async () => {
            if (busy.value || liked.value) return;
            busy.value = true;
            error.value = '';
            try {
              likes.value = await likeSong(play.id);
              liked.value = true;
              const identity = musicIdentity(play.activity);
              history.value = history.value.map((entry) =>
                musicIdentity(entry.activity) === identity
                  ? { ...entry, likes: likes.value, liked: true }
                  : entry
              );
              mostLiked.value = mostLiked.value.map((entry) =>
                musicIdentity(entry.activity) === identity
                  ? { ...entry, likes: likes.value, liked: true }
                  : entry
              );
              void loadMostLikedMusic()
                .then((entries) => {
                  mostLiked.value = entries;
                })
                .catch((error: unknown) => {
                  console.error('Unable to refresh most liked songs:', error);
                });
            } catch {
              error.value = 'Unable to like this song. Try again.';
            } finally {
              busy.value = false;
            }
          }}
        >
          <Heart size={16} fill={liked.value ? 'currentColor' : 'none'} />
          <span class="tabular-nums">{likes.value}</span>
        </button>
        {error.value && (
          <p role="status" class="w-full text-pink-300">
            {error.value}
          </p>
        )}
      </div>
    );
  }
);
