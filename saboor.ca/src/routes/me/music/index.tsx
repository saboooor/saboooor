import { component$, useContext } from '@qwik.dev/core';
import { DocumentHead } from '@qwik.dev/router';
import { ExpandedCard } from '~/components/Activity/ActivityCard';
import { DiscordContext } from '~/routes/layout';

export default component$(() => {
  const discord = useContext(DiscordContext);
  const musicActivity = discord.value?.activities.find((activity: any) => activity.type === 2);

  return <>
    <section class="flex flex-col gap-4 relative max-w-3xl px-4 mx-auto items-center justify-center min-h-svh">
      {musicActivity ?
        <ExpandedCard activity={musicActivity} />
        : <p class="text-gray-400">No music playing at the moment.</p>}
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
