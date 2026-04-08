import { component$, useContext, useSignal } from '@qwik.dev/core';
import { DocumentHead } from '@qwik.dev/router';
import { Hand } from 'lucide-icons-qwik';
import Socials from '~/components/Socials';
import { addWave, messages } from '..';
import { DiscordContext } from '../layout';
import { Background } from '~/root';

export default component$(() => {
  const waves = useSignal(undefined as number | undefined);
  const discord = useContext(DiscordContext);
  const customStatus = discord.value?.activities.find((activity: any) => activity.type === 4);

  return <>
    <section class="flex flex-col gap-4 relative max-w-3xl px-4 mx-auto items-center justify-center min-h-svh">
      <div class="relative transition-all duration-300 lum-card md:p-12 pt-24 md:pt-48 lum-grad-bg-orange-950/10 hover:lum-bg-orange-900/10">
        <Background
          width={1280} height={720}
          alt="Saboor's banner"
          class="rounded-lum rounded-b-none mb-4 object-cover absolute top-0 left-0 -z-1 mask-b-from-60%" />

        <h1 class="flex gap-2 items-center text-xl md:text-3xl font-bold text-shadow-lg text-shadow-black/50 animate-in fade-in slide-in-from-top-5 anim-duration-800">
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

        <p class="font-semibold text-sm text-gray-400 text-shadow-lg text-shadow-black/50 animate-in fade-in slide-in-from-top-5 anim-duration-950">
          he • 21 • infp
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
          <b class="text-white">welcome to my personal website!</b><br/>
          you can find a lot about me here
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
