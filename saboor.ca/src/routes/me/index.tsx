import { component$, useContext, useSignal } from '@qwik.dev/core';
import { DocumentHead } from '@qwik.dev/router';
import Hand from 'lucide-icons-qwik/icons/Hand';
import Socials from '~/components/Socials';
import { addWave, messages } from '..';
import { Bg, DiscordContext } from '../layout';

export default component$(() => {
  const waves = useSignal(undefined as number | undefined);
  const discord = useContext(DiscordContext);
  const customStatus = discord.value?.activities.find(
    (activity: any) => activity.type === 4
  );

  return (
    <>
      <section class="relative mx-auto flex min-h-svh max-w-3xl flex-col items-center justify-center gap-4 px-4">
        <div class="lum-card lum-grad-bg-orange-950/10 hover:lum-bg-orange-900/10 relative pt-24 transition-all duration-300 md:p-12 md:pt-48">
          <img
            src={Bg}
            width={1280}
            height={720}
            alt="Saboor's banner"
            class="rounded-lum absolute top-0 left-0 -z-1 mb-4 rounded-b-none mask-b-from-60% object-cover"
          />

          <h1 class="animate-in fade-in slide-in-from-top-5 flex items-center gap-2 text-xl font-bold duration-800 text-shadow-black/50 text-shadow-lg md:text-3xl">
            <button
              class="lum-btn hand-wave lum-bg-transparent p-1"
              onClick$={async () => {
                if (waves.value) return;
                waves.value = 1;
                waves.value = await addWave();
              }}
              data-umami-event="wave"
            >
              <Hand size={32} class="w-8 rotate-25" />
            </button>
            Hi, I'm Saboor. (aka sab)
          </h1>

          <p
            class={{
              'text-lum-text-secondary text-sm transition-all duration-300 text-shadow-lg': true,
              'pointer-events-none -my-4 opacity-0': !waves.value,
            }}
          >
            {messages[Math.floor(Math.random() * messages.length)]}
            <span
              class={{
                'pl-1 font-semibold transition-opacity duration-300': true,
                'opacity-100': waves.value && waves.value > 2,
                'opacity-0': !waves.value || waves.value <= 2,
              }}
            >
              {waves.value} waves so far! 👋
            </span>
          </p>

          <p class="text-lum-text-secondary animate-in fade-in slide-in-from-top-5 text-sm font-semibold duration-950 text-shadow-black/50 text-shadow-lg">
            he • 21 • infp
          </p>

          {customStatus?.state && !customStatus?.state.startsWith('♡') && (
            <p class="animate-in fade-in slide-in-from-top-5 flex items-center gap-2 font-semibold text-gray-400 duration-950 text-shadow-black/50 text-shadow-lg">
              {customStatus.emoji && (
                <span class="relative">
                  <img
                    src={
                      'https://cdn.discordapp.com/emojis/' +
                      customStatus.emoji.id
                    }
                    class="animate-ping opacity-20"
                    alt={customStatus.emoji.name}
                    width={20}
                    height={20}
                  />
                  <img
                    src={
                      'https://cdn.discordapp.com/emojis/' +
                      customStatus.emoji.id
                    }
                    class="absolute top-0"
                    alt={customStatus.emoji.name}
                    width={20}
                    height={20}
                  />
                </span>
              )}
              {customStatus.state}
            </p>
          )}

          <p class="animate-in slide-in-from-top-5 text-gray-400 duration-1250 md:text-lg">
            <b class="text-white">welcome to my personal website!</b>
            <br />
            you can find a lot about me here
          </p>

          <span
            class={{
              'text-lum-border/30 animate-in fade-in slide-in-from-top-5 text-xs transition-all duration-1700': true,
              '-mt-8 opacity-0': waves.value,
            }}
          >
            psst.. click on the waving hand next to my name!
          </span>

          <hr class="border-lum-border/10 my-2" />

          <div class="flex flex-wrap justify-evenly">
            <Socials class="rounded-lum-6" />
          </div>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Hi, I'm Saboor. (aka sab)",
  meta: [
    {
      name: 'description',
      content:
        "I'm a self-taught full-stack software developer, I have always loved technology, problem-solving, creativity, and design. Also a Culinary Arts graduate from NAIT, cooking diverse cuisines and thriving in creative, collaborative environments. I like to experiment with stuff.",
    },
    {
      name: 'og:description',
      content:
        "I'm a self-taught full-stack software developer, I have always loved technology, problem-solving, creativity, and design. Also a Culinary Arts graduate from NAIT, cooking diverse cuisines and thriving in creative, collaborative environments. I like to experiment with stuff.",
    },
    {
      name: 'og:image',
      content: 'https://avatars.githubusercontent.com/u/42164502',
    },
  ],
};
