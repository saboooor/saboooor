import { musicHead } from '~/util/musicHead';
import { useData } from '~/routes/layout';
import type { MusicActivity } from '~/components/Activity/LastMusic';
import { component$, useContext, useSignal } from '@qwik.dev/core';
import { DocumentHead } from '@qwik.dev/router';
import ActivityCard, { ExpandedCard } from '~/components/Activity/ActivityCard';
import { musicIdentity } from '~/components/Activity/LastMusic';
import {
  DiscordContext,
  LastMusicContext,
  MusicHistoryContext,
  MostLikedMusicContext,
  loadOlderMusic,
} from '~/routes/layout';

export default component$(() => {
  const discord = useContext(DiscordContext);
  const lastMusic = useContext(LastMusicContext);
  const history = useContext(MusicHistoryContext);
  const mostLiked = useContext(MostLikedMusicContext);
  const loading = useSignal(false);
  const more = useSignal(true);
  const error = useSignal('');
  const musicActivity =
    discord.value?.activities.find((activity: any) => activity.type === 2) ||
    lastMusic.value;

  const latestPlay = history.value.find(
    (play) => musicIdentity(play.activity) === musicIdentity(musicActivity)
  );
  const groups = new Map<string, typeof history.value>();
  for (const play of history.value) {
    if (musicIdentity(play.activity) === musicIdentity(musicActivity)) continue;
    const date = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/Toronto',
    }).format(play.caughtAt);
    groups.set(date, [...(groups.get(date) || []), play]);
  }

  return (
    <>
      <section class="relative mx-auto grid min-h-svh max-w-7xl grid-cols-1 items-start gap-8 px-4 pt-40 pb-28 lg:grid-cols-2">
        <div class="flex min-w-0 flex-col gap-8">
          {musicActivity ? (
            <ExpandedCard
              activity={musicActivity}
              previewOpen
              musicPlay={latestPlay}
            />
          ) : (
            <p class="text-gray-400">No music playing at the moment.</p>
          )}
          <div class="flex flex-col gap-4">
            <h2 class="text-xl font-semibold">Most liked</h2>
            {mostLiked.value.length ? (
              <ol class="flex flex-col gap-3">
                {mostLiked.value.map((play, index) => (
                  <li key={play.id} class="flex min-w-0 items-start gap-3">
                    <span class="pt-3 text-sm font-semibold text-violet-300 tabular-nums">
                      {index + 1}
                    </span>
                    <ActivityCard
                      activity={play.activity}
                      musicPlay={play}
                      compact
                      class="min-w-0 flex-1 md:max-w-full md:min-w-0"
                    />
                  </li>
                ))}
              </ol>
            ) : (
              <p class="text-sm text-gray-400">
                No likes yet. Like a song to start the list.
              </p>
            )}
          </div>
        </div>
        {groups.size > 0 && (
          <div class="flex w-full min-w-0 flex-col gap-4">
            <h2 class="text-2xl font-semibold">Previously caught playing</h2>
            <h3 class="text-lg">
              I've been seen on this very website playing these songs 👀 go
              ahead and press the like button on them if you like the song :) I
              think my music taste is pretty good if I say so myself :p
            </h3>
            {Array.from(groups, ([date, plays]) => (
              <div key={date} class="flex flex-col gap-3">
                <h3 class="text-lg font-bold">{date}</h3>
                <div class="grid grid-cols-1 items-start gap-3 sm:grid-cols-2">
                  {plays.map((play) => (
                    <ActivityCard
                      key={play.id}
                      activity={play.activity}
                      musicPlay={play}
                      compact
                      class="w-full min-w-0 md:max-w-full md:min-w-0"
                    />
                  ))}
                </div>
              </div>
            ))}
            {more.value && history.value.length >= 50 && (
              <button
                type="button"
                class="lum-btn lum-bg-gray-900/50 rounded-lum-4 self-center"
                disabled={loading.value}
                onClick$={async () => {
                  loading.value = true;
                  error.value = '';
                  try {
                    const entries = await loadOlderMusic(
                      history.value[history.value.length - 1].id
                    );
                    history.value = [...history.value, ...entries];
                    more.value = entries.length === 50;
                  } catch {
                    error.value = 'Unable to load older songs. Try again.';
                  } finally {
                    loading.value = false;
                  }
                }}
              >
                {loading.value ? 'Loading…' : 'Load older songs'}
              </button>
            )}
            {error.value && (
              <p role="status" class="text-sm text-gray-400">
                {error.value}
              </p>
            )}
          </div>
        )}
      </section>
    </>
  );
});

export const head: DocumentHead = ({ resolveValue, url }) => {
  const { lanyard, lastMusic } = resolveValue(useData);
  const current: MusicActivity | undefined = lanyard?.activities.find(
    (activity: MusicActivity) => activity.type === 2
  );
  return musicHead(current, lastMusic, url);
};
