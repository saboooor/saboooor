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
  musicIdentity,
  syncLastMusic,
  type MusicActivity,
} from '~/components/Activity/LastMusic';
import {
  connectLanyardSocket,
  getLanyardData,
} from '~/components/Activity/Lanyard';
import Footer from '~/components/Footer';
import Banner from '~/components/Banner';
import { Nav } from '~/components/Nav';

export const useData = routeLoader$(async ({ request, platform }) => {
  const isSafari = request.headers.get('user-agent')?.includes('Safari');
  const lanyard = await getLanyardData(isSafari);
  let lastMusic: MusicActivity | null = null;
  try {
    lastMusic = await syncLastMusic(
      (platform.env as Env | undefined)?.waves,
      lanyard?.activities.find((activity: MusicActivity) => activity.type === 2)
    );
  } catch (error) {
    console.error('Unable to save last played song:', error);
  }
  return {
    lanyard,
    lastMusic,
  };
});

export const refreshLastMusic = server$(async function () {
  const lanyard = await getLanyardData();
  return syncLastMusic(
    (this.platform.env as Env | undefined)?.waves,
    lanyard?.activities.find((activity: MusicActivity) => activity.type === 2)
  );
});

export const DiscordContext = createContextId<Signal<any>>('discord-context');
export const LastMusicContext =
  createContextId<Signal<MusicActivity | null>>('last-music-context');
export const NowContext = createContextId<Signal<number>>('now-context');
export const Bg = '/banner';
export default component$(() => {
  const {
    value: { lanyard, lastMusic: savedMusic },
  } = useData();
  const discord = useSignal<any>(lanyard);
  useContextProvider(DiscordContext, discord);
  const lastMusic = useSignal(savedMusic);
  useContextProvider(LastMusicContext, lastMusic);
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
      let previousSong = musicIdentity(
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
            const identity = musicIdentity(current);
            if (identity && identity !== previousSong) {
              lastMusic.value = {
                ...current,
                timestamps: undefined,
                lastPlayed: true,
              };
              void refreshLastMusic().catch((error: unknown) => {
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
