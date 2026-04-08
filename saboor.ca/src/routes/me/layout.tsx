import { component$, Slot, useContext, useSignal } from '@qwik.dev/core';
import { DiscordContext, NowContext } from '../layout';
import ActivityCard from '~/components/Activity/ActivityCard';
import { Balloon, ChevronUp, Music } from 'lucide-icons-qwik';
import { Link, useLocation } from '@qwik.dev/router';

export default component$(() => {
  const discord = useContext(DiscordContext);
  const now = useContext(NowContext);
  const loc = useLocation();
  const hidden = useSignal(false);

  return (
    <>
      <div class="fixed top-5 w-full z-100">
        <div class="flex gap-2 items-center justify-center max-w-7xl mx-auto flex-wrap">
          <div class="relative w-16 h-16 rounded-lum-4 lum-grad-bg-yellow-950/0">
            <img src={`https://cdn.discordapp.com/avatars/249638347306303499/${discord.value?.discord_user?.avatar}.png?size=128`} alt="Saboor's avatar"
              width={64} height={64} class="rounded-lum-4 absolute -z-1" />
          </div>
          {discord.value?.activities.map((activity: any) => {
            if (activity.type === 4) return;
            return <ActivityCard class={{
              '': !hidden.value,
              'hidden': hidden.value,
            }} key={activity.id} activity={activity} now={now} fixedwidth compact />;
          })}
          <button class="lum-btn rounded-lum-4 p-3 lum-grad-bg-gray-900/50 hover:lum-bg-gray-800 drop-shadow-2xl backdrop-blur-lg" onClick$={() => hidden.value = !hidden.value}>
            <span class={{
              'transition-all duration-300': true,
              'rotate-180': hidden.value,
            }}>
              <ChevronUp size={38} />
            </span>
          </button>
        </div>
      </div>
      <Slot />
      <div class="fixed flex justify-center bottom-5 w-full">
        <div class="flex gap-1 items-center lum-grad-bg-gray-900 p-1 rounded-lum">
          <Link href="/me"
            class={{
              'text-gray-200 lum-btn rounded-r-lg lum-bg-transparent': true,
              'lum-grad-bg-lum-accent hover:lum-bg-lum-accent': loc.url.pathname === '/me' || loc.url.pathname === '/me/',
            }}>
            <Balloon />
            home
          </Link>
          <Link href="/me/music"
            class={{
              'text-gray-200 lum-btn rounded-l-lg lum-bg-transparent': true,
              'lum-grad-bg-lum-accent hover:lum-bg-lum-accent': loc.url.pathname.includes('/me/music'),
            }}>
            <Music />
            music
          </Link>
        </div>
      </div>
    </>
  );
});
