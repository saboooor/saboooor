import { component$ } from '@qwik.dev/core';
import { DocumentHead, Link } from '@qwik.dev/router';
import { Luminescent } from '@luminescent/icons-qwik';

export default component$(() => {
  return (
    <section class="mx-auto flex min-h-[calc(100svh)] max-w-xl flex-col justify-center px-4 pt-24">
      <h1 class="animate-in fade-in slide-in-from-top-8 relative text-3xl font-bold text-gray-100 duration-1000 sm:text-6xl">
        <div style="filter: drop-shadow(0 0 3rem #CB6CE6);">
          <div
            class="flex items-center gap-2 fill-[#f0ccfb] font-semibold text-[#f0ccfb] select-none sm:gap-5"
            style="filter: drop-shadow(0 0 5rem #CB6CE6);"
          >
            <Luminescent size={200} class="mt-2 hidden sm:flex" />
            <Luminescent size={100} class="mt-1 flex sm:hidden" />
          </div>
        </div>
      </h1>
      <h1 class="mt-16 text-2xl font-bold text-red-500 sm:text-5xl">
        404: Page not found
      </h1>
      <p class="my-6 text-lg text-gray-400 sm:text-2xl">
        Whoops! You've hit a dead-end.
      </p>
      <div class="grid gap-3 pt-4 sm:flex">
        <Link href="/" class="lum-btn">
          Go back home
        </Link>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: '404: Page not found',
  meta: [
    {
      name: 'description',
      content: "Whoops! You've hit a dead-end.",
    },
    {
      name: 'og:description',
      content: "Whoops! You've hit a dead-end.",
    },
    {
      name: 'og:image',
      content: 'https://avatars.githubusercontent.com/u/42164502',
    },
  ],
};
