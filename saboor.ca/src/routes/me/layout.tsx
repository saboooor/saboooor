import { component$, Slot, useContext } from '@builder.io/qwik';
import { DiscordContext, NowContext } from '../layout';
import ActivityCard from '~/components/Activity/ActivityCard';
import { Music } from 'lucide-icons-qwik';

export default component$(() => {
  const discord = useContext(DiscordContext);
  const now = useContext(NowContext);

  return (
    <>
      <div class="fixed top-5 w-full z-100">
        <div class="flex gap-2 items-center justify-center max-w-7xl mx-auto">
          <div class="relative w-16 h-16 rounded-lum-4 lum-bg-yellow-950/0">
            <img src={`https://cdn.discordapp.com/avatars/249638347306303499/${discord.value?.discord_user?.avatar}.png?size=128`} alt="Saboor's avatar"
              width={64} height={64} class="rounded-lum-4 absolute -z-1" />
          </div>
          {discord.value?.activities.map((activity: any) => {
            if (activity.type === 4) return;
            return <ActivityCard key={activity.id} activity={activity} now={now} fixedwidth compact />;
          })}
        </div>
      </div>
      <Slot />
      <div class="fixed bottom-5 w-full">
        <div class="flex gap-2 items-center justify-center max-w-7xl mx-auto">
          <a href="https://maps.app.goo.gl/mYwF9KAjWi7oEUA86" target="_blank" data-umami-event="location"
            class="text-gray-200 lum-btn lum-btn-p-4 lum-bg-pink-500/10 text-2xl">
            <Music size={36} />
            Music
          </a>
        </div>
      </div>
    </>
  );
});
