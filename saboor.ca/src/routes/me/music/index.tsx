import { component$ } from '@qwik.dev/core';
import { DocumentHead } from '@qwik.dev/router';

export default component$(() => {

  return <>
    <section class="flex flex-col gap-4 relative max-w-xl px-4 mx-auto items-center justify-center min-h-svh">
      coming soon
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
