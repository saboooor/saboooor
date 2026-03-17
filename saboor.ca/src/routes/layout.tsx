import { component$, createContextId, Signal, Slot, useContextProvider, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { connectLanyardSocket, getLanyardData } from '~/components/Activity/Lanyard';
import Footer from '~/components/Footer';
import { Nav } from '~/components/Nav';

export const useData = routeLoader$(async ({ request }) => {
  const isSafari = request.headers.get('user-agent')?.includes('Safari');
  return {
    lanyard: await getLanyardData(isSafari),
  };
});

export const DiscordContext = createContextId<Signal<any>>('discord-context');
export const NowContext = createContextId<Signal<number>>('now-context');
export default component$(() => {
  const { value: { lanyard } } = useData();
  const discord = useSignal<any>(lanyard);
  useContextProvider(DiscordContext, discord);
  const now = useSignal(Date.now());
  useContextProvider(NowContext, now);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    setInterval(() => {
      now.value = Date.now();
    }, 1000);

    setTimeout(() => {
      connectLanyardSocket('249638347306303499', (d: any) => {
        if (!d.success) return console.error(d.error);
        console.log(d.data);
        discord.value = d.data;
      }, (error: string) => {
        console.error('Error connecting to Lanyard WebSocket:', error);
      }, discord.value.isSafari);
    }, 5000);
  });

  return (
    <>
      <Nav />
      <Slot />
      <Footer />
    </>
  );
});
