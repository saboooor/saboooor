import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { Hand } from 'lucide-icons-qwik';
import ActivityCard from '~/components/Activity/ActivityCard';
import Socials from '~/components/Socials';
import { connectLanyardSocket, getLanyardData } from '~/components/Activity/Lanyard';
import { addWave, messages } from '..';

export const useData = routeLoader$(async ({ request }) => {
  const isSafari = request.headers.get('user-agent')?.includes('Safari');
  return {
    lanyard: await getLanyardData(isSafari),
  };
});

export default component$(() => {
  const { value: { lanyard } } = useData();
  const discord = useSignal<any>(lanyard);
  const now = useSignal(Date.now());
  const waves = useSignal(undefined as number | undefined);

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

  const customStatus = discord.value?.activities.find((activity: any) => activity.type === 4);

  return <>
    <section class="flex flex-col md:flex-row relative mx-auto max-w-xl lg:gap-32 px-4 items-center justify-center min-h-svh">
      <div class="md:flex-1 flex flex-col gap-4 before:rounded-lum before:bg-red-500">
        <div class="relative transition-all duration-300 lum-card md:p-12 pt-24 md:pt-48 lum-bg-luminescent-950/10 hover:lum-bg-luminescent-900/10 gradient-border">
          <div class="absolute -top-18 left-0 w-full">
            <img src={`https://cdn.discordapp.com/avatars/249638347306303499/${discord.value?.discord_user?.avatar}.png?size=128`} alt="Saboor's avatar"
              width={128} height={128} class="rounded-full border border-lum-border/30 mx-auto" />
          </div>
          <img src="https://dcdn.dstn.to/banners/249638347306303499?size=1280"
            width={1280} height={720}
            alt="Saboor's banner"
            class="rounded-lum rounded-b-none mb-4 object-cover absolute top-0 left-0 -z-1 mask-b-from-60%" />

          <h1 class="flex gap-2 items-center text-xl md:text-3xl font-bold text-shadow-lg text-shadow-black/50 animate-in fade-in slide-in-from-top-5 slide-in-from-top-5 anim-duration-800">
            <button class="lum-btn p-1 hand-wave lum-bg-transparent" onClick$={async () => {
              if (waves.value) return;
              waves.value = 1;
              waves.value = await addWave();
            }} data-umami-event="wave">
              <Hand size={32} class="rotate-25 w-8" />
            </button>
            Hi, I'm Saboor. (aka sab)
          </h1>

          <p class={{
            'transition-all duration-300 text-gray-200 text-sm text-shadow-lg': true,
            '-my-4 opacity-0 pointer-events-none': !waves.value,
          }}>
            {messages[Math.floor(Math.random() * messages.length)]}
            <span class={{
              'transition-opacity duration-300 pl-1 font-semibold': true,
              'opacity-100': waves.value && waves.value > 2,
              'opacity-0': !waves.value || waves.value <= 2,
            }}>
              {waves.value} waves so far! 👋
            </span>
          </p>

          {customStatus?.state && !customStatus?.state.startsWith('♡') &&
            <p class="flex font-semibold items-center gap-2 text-gray-400 text-shadow-lg text-shadow-black/50 animate-in fade-in slide-in-from-top-5 anim-duration-950">
              {customStatus.emoji && <span class="relative">
                <img src={
                  'https://cdn.discordapp.com/emojis/' + customStatus.emoji.id
                } class="animate-ping opacity-20"
                alt={customStatus.emoji.name} width={20} height={20} />
                <img src={
                  'https://cdn.discordapp.com/emojis/' + customStatus.emoji.id
                } class="absolute top-0"
                alt={customStatus.emoji.name} width={20} height={20} />
              </span>
              }
              {customStatus.state}
            </p>
          }

          <p class="text-gray-400 md:text-lg animate-in slide-in-from-top-5 anim-duration-1250">
            <span class="font-bold text-gray-200 animate-in fade-in anim-duration-1250">
              coming soon :)
            </span>
          </p>

          <span class={{
            'transition-all text-lum-border/30 text-xs animate-in fade-in slide-in-from-top-5 anim-duration-1700': true,
            'opacity-0 -mt-8': waves.value,
          }}>
            psst.. click on the waving hand next to my name!
          </span>

          <hr class="my-2 border-lum-border/10" />

          <div class="flex justify-evenly flex-wrap">
            <Socials class="rounded-lum-6" />
          </div>
        </div>
        <div class="flex gap-2 flex-row flex-wrap justify-evenly">
          {discord.value?.activities.map((activity: any) => {
            if (activity.type === 4) return;
            return <ActivityCard key={activity.id} activity={activity} now={now} />;
          })}
        </div>
      </div>
    </section>
  </>;
});

export const head: DocumentHead = {
  title: 'Hi, I\'m Saboor. (aka sab)',
  meta: [
    {
      name: 'description',
      content: 'I\'m a self-taught full-stack software developer, I have always loved technology, problem-solving, creativity, and design. Also a Culinary Arts graduate from NAIT, cooking diverse cuisines and thriving in creative, collaborative environments. I like to experiment with stuff.',
    },
    {
      name: 'og:description',
      content: 'I\'m a self-taught full-stack software developer, I have always loved technology, problem-solving, creativity, and design. Also a Culinary Arts graduate from NAIT, cooking diverse cuisines and thriving in creative, collaborative environments. I like to experiment with stuff.',
    },
    {
      name: 'og:image',
      content: 'https://avatars.githubusercontent.com/u/42164502',
    },
  ],
};
