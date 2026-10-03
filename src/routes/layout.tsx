import { getDB } from '~/util/db';
import {
  component$,
  createContextId,
  Signal,
  Slot,
  useContextProvider,
  useSignal,
  useVisibleTask$,
} from '@qwik.dev/core';
import { routeLoader$, server$ } from '@qwik.dev/router';
import {
  musicSessionIdentity,
  catchMusic,
  musicHistory,
  likeMusic,
  type MusicPlay,
  type MusicActivity,
} from '~/components/Activity/LastMusic';
import {
  connectLanyardSocket,
  getLanyardData,
} from '~/components/Activity/Lanyard';
import Footer from '~/components/Footer';
import Banner from '~/components/Banner';
import { Nav } from '~/components/Nav';

export const useData = routeLoader$(async ({ request, platform, cookie }) => {
  const isSafari = request.headers.get('user-agent')?.includes('Safari');
  const lanyard = await getLanyardData(isSafari);
  let history: MusicPlay[] = [];
  let mostLiked: MusicPlay[] = [];
  const db = (platform.env as Env | undefined)?.music ? getDB() : undefined;
  try {
    if (db) {
      await catchMusic(
        db,
        lanyard?.activities.find(
          (activity: MusicActivity) => activity.type === 2
        )
      );
      history = await musicHistory(
        db,
        cookie.get('music-visitor')?.value || ''
      );
      mostLiked = await musicHistory(
        db,
        cookie.get('music-visitor')?.value || '',
        undefined,
        true
      );
    }
  } catch (error) {
    console.error('Unable to load music history:', error);
  }
  return {
    lanyard,
    lastMusic: history[0]?.activity || null,
    history,
    mostLiked,
  };
});

export const loadMostLikedMusic = server$(async function () {
  const db = (this.platform.env as Env | undefined)?.music
    ? getDB()
    : undefined;
  return db
    ? musicHistory(
        db,
        this.cookie.get('music-visitor')?.value || '',
        undefined,
        true
      )
    : [];
});

export const refreshLastMusic = server$(async function () {
  const db = (this.platform.env as Env | undefined)?.music
    ? getDB()
    : undefined;
  if (!db) return [];
  const lanyard = await getLanyardData();
  await catchMusic(
    db,
    lanyard?.activities.find((activity: MusicActivity) => activity.type === 2)
  );
  return musicHistory(db, this.cookie.get('music-visitor')?.value || '');
});

export const loadOlderMusic = server$(async function (before: number) {
  if (!Number.isSafeInteger(before) || before < 1)
    throw new Error('Invalid history cursor');
  const db = (this.platform.env as Env | undefined)?.music
    ? getDB()
    : undefined;
  return db
    ? musicHistory(db, this.cookie.get('music-visitor')?.value || '', before)
    : [];
});

export const likeSong = server$(async function (id: number) {
  const db = (this.platform.env as Env | undefined)?.music
    ? getDB()
    : undefined;
  if (!db) throw new Error('Music database unavailable');
  let visitor = this.cookie.get('music-visitor')?.value;
  if (!visitor) {
    visitor = crypto.randomUUID();
    this.cookie.set('music-visitor', visitor, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: this.url.protocol === 'https:',
      maxAge: 31536000,
    });
  }
  return likeMusic(db, id, visitor);
});

export const DiscordContext = createContextId<Signal<any>>('discord-context');
export const LastMusicContext =
  createContextId<Signal<MusicActivity | null>>('last-music-context');
export const MusicHistoryContext = createContextId<Signal<MusicPlay[]>>(
  'music-history-context'
);
export const MostLikedMusicContext = createContextId<Signal<MusicPlay[]>>(
  'most-liked-music-context'
);
export const NowContext = createContextId<Signal<number>>('now-context');
export const Bg = '/banner';
export default component$(() => {
  const {
    value: {
      lanyard,
      lastMusic: savedMusic,
      history: savedHistory,
      mostLiked: savedMostLiked,
    },
  } = useData();
  const discord = useSignal<any>(lanyard);
  useContextProvider(DiscordContext, discord);
  const lastMusic = useSignal(savedMusic);
  useContextProvider(LastMusicContext, lastMusic);
  const history = useSignal(savedHistory);
  useContextProvider(MusicHistoryContext, history);
  const mostLiked = useSignal(savedMostLiked);
  useContextProvider(MostLikedMusicContext, mostLiked);
  const now = useSignal(Date.now());
  useContextProvider(NowContext, now);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    () => {
      const intervalId = setInterval(() => {
        now.value = Date.now();
      }, 1000);
      return () => clearInterval(intervalId);
    },
    { strategy: 'document-ready' }
  );

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    ({ cleanup }) => {
      let previousSong = musicSessionIdentity(
        discord.value?.activities.find(
          (activity: MusicActivity) => activity.type === 2
        )
      );
      cleanup(
        connectLanyardSocket(
          '249638347306303499',
          (d: any) => {
            if (!d.success) return console.error(d.error);
            console.log(d.data);
            discord.value = d.data;
            const current = d.data.activities.find(
              (activity: MusicActivity) => activity.type === 2
            );
            const identity = musicSessionIdentity(current);
            if (identity && identity !== previousSong) {
              lastMusic.value = {
                ...current,
                timestamps: undefined,
                lastPlayed: true,
              };
              void refreshLastMusic()
                .then((entries) => {
                  history.value = entries;
                  if (entries[0]) lastMusic.value = entries[0].activity;
                })
                .catch((error: unknown) => {
                  console.error('Unable to save last played song:', error);
                });
            }
            previousSong = identity;
          },
          (error: string) => {
            console.error('Error connecting to Lanyard WebSocket:', error);
          },
          discord.value?.isSafari
        )
      );
    },
    { strategy: 'document-ready' }
  );

  return (
    <>
      <Banner
        width={1280}
        height={720}
        alt="Saboor's banner"
        class="fixed top-0 -z-1 w-full scale-120 overflow-clip mask-b-from-0 opacity-20 blur-xl"
      />
      <Slot />
      <Nav />
      <Footer />
    </>
  );
});
