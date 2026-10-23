import { musicHead } from '~/util/musicHead';
import { useData } from '~/routes/layout';
import type { MusicActivity } from '~/components/Activity/LastMusic';
import { component$, useContext, useSignal } from '@qwik.dev/core';
import { DocumentHead, routeLoader$ } from '@qwik.dev/router';
import { dailyJournalEntry, journalContent } from '~/content/journal';
import Hand from 'lucide-icons-qwik/icons/Hand';
import Socials from '~/components/Socials';
import { addWave, messages } from '..';
import { DiscordContext } from '../layout';
import Banner from '~/components/Banner';

export const useDailyJournal = routeLoader$(() => dailyJournalEntry());

export default component$(() => {
  const journal = useDailyJournal();
  const unwrapped = useSignal(false);
  const JournalContent = journal.value
    ? journalContent(journal.value.id)
    : undefined;
  const waves = useSignal(undefined as number | undefined);
  const discord = useContext(DiscordContext);
  const customStatus = discord.value?.activities.find(
    (activity: any) => activity.type === 4
  );

  return (
    <>
      <section class="relative mx-auto grid min-h-svh max-w-7xl grid-cols-1 items-start gap-8 px-4 pt-40 pb-28 lg:grid-cols-2">
        <div class="lum-card lum-grad-bg-orange-950/10 hover:lum-bg-orange-900/10 relative pt-24 transition-all duration-300 md:p-12 md:pt-48">
          <Banner
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
              aria-label="Wave hello to Saboor"
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
            about me, what I'm into, and where to find me.
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
            <Socials class="rounded-lum-6" idPrefix="me" />
          </div>
        </div>
        <section
          aria-label="Daily journal gift"
          class={{
            'lum-card lum-grad-bg-gray-950/10 flex min-w-0 flex-col gap-4': true,
            'p-0 overflow-hidden': !unwrapped.value,
            'md:p-12': unwrapped.value,
          }}
        >
          {!unwrapped.value ? (
            <button
              type="button"
              aria-label="Unwrap today's journal entry"
              aria-expanded={false}
              class="group rounded-lum relative isolate flex min-h-72 w-full cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden border border-gray-200/15 bg-gray-950 px-6 py-16 text-gray-100 transition duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-300 motion-reduce:transition-none"
              onClick$={() => {
                unwrapped.value = true;
              }}
            >
              <span
                aria-hidden="true"
                class="pointer-events-none absolute inset-0 -z-10 opacity-20"
                style="background-image: repeating-linear-gradient(45deg, transparent, transparent 18px, var(--color-gray-200) 18px, var(--color-gray-200) 19px);"
              />
              <span
                aria-hidden="true"
                class="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-10 -translate-x-1/2 bg-gray-300/15 ring-1 ring-gray-200/15"
              />
              <span
                aria-hidden="true"
                class="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-10 -translate-y-1/2 bg-gray-300/15 ring-1 ring-gray-200/15"
              />
            </button>
          ) : journal.value ? (
            <article class="animate-in fade-in flex flex-col gap-3 duration-500 motion-reduce:animate-none">
              <h3 class="text-lg font-semibold">{journal.value.title}</h3>
              {journal.value.date && (
                <time
                  dateTime={journal.value.date}
                  class="text-lum-text-secondary text-sm"
                >
                  {journal.value.date}
                </time>
              )}
              {JournalContent && (
                <div class="markdown min-w-0 wrap-break-word">
                  <JournalContent />
                </div>
              )}
            </article>
          ) : (
            <p class="text-lum-text-secondary">Nothing to see here yet.</p>
          )}
        </section>
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
