import { component$, Slot, useContext, useSignal } from '@qwik.dev/core';
import { DiscordContext } from '../layout';
import ActivityCard from '~/components/Activity/ActivityCard';
import Balloon from 'lucide-icons-qwik/icons/Balloon';
import ChevronUp from 'lucide-icons-qwik/icons/ChevronUp';
import Music from 'lucide-icons-qwik/icons/Music';
import { Link, useLocation } from '@qwik.dev/router';

export default component$(() => {
  const discord = useContext(DiscordContext);
  const loc = useLocation();
  const hidden = useSignal(false);

  return (
    <>
      <div class="fixed top-5 z-100 w-full">
        <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2">
          <div class="rounded-lum-4 lum-grad-bg-yellow-950/0 relative h-16 w-16">
            <img
              src={`https://cdn.discordapp.com/avatars/249638347306303499/${discord.value?.discord_user?.avatar}.png?size=128`}
              alt="Saboor's avatar"
              width={64}
              height={64}
              class="rounded-lum-4 absolute -z-1"
            />
          </div>
          {discord.value?.activities.map((activity: any) => {
            if (activity.type === 4) return;
            return (
              <ActivityCard
                class={{
                  '': !hidden.value,
                  hidden: hidden.value,
                }}
                key={activity.id}
                activity={activity}
                fixedwidth
                compact
              />
            );
          })}
          <button
            class="lum-btn rounded-lum-4 lum-grad-bg-gray-900/50 hover:lum-bg-gray-800 p-3 drop-shadow-2xl backdrop-blur-lg"
            onClick$={() => (hidden.value = !hidden.value)}
          >
            <span
              class={{
                'transition-all duration-300': true,
                'rotate-180': hidden.value,
              }}
            >
              <ChevronUp size={38} />
            </span>
          </button>
        </div>
      </div>
      <Slot />
      <div class="fixed bottom-5 flex w-full justify-center">
        <div class="lum-grad-bg-gray-900 rounded-lum flex items-center gap-1 p-1">
          <Link
            href="/me"
            class={{
              'lum-btn lum-bg-transparent rounded-r-lg text-gray-200': true,
              'lum-grad-bg-lum-accent hover:lum-bg-lum-accent':
                loc.url.pathname === '/me' || loc.url.pathname === '/me/',
            }}
          >
            <Balloon />
            home
          </Link>
          <Link
            href="/me/music"
            class={{
              'lum-btn lum-bg-transparent rounded-l-lg text-gray-200': true,
              'lum-grad-bg-lum-accent hover:lum-bg-lum-accent':
                loc.url.pathname.includes('/me/music'),
            }}
          >
            <Music />
            music
          </Link>
        </div>
      </div>
    </>
  );
});
