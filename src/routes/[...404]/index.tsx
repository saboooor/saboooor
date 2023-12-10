import { component$ } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';

import { ChevronBack } from 'qwik-ionicons';

export default component$(() => {
  return (
    <section class="flex mx-auto max-w-6xl px-6 items-center" style={{ minHeight: 'calc(100dvh - 64px)' }}>
      <div class="text-left space-y-5">
        <div class="flex relative justify-start mb-5" style="width: 100%;">
          <img width={256} height={256} class="rounded-2xl ease-in-out filter drop-shadow-2xl" src={`https://avatars.githubusercontent.com/u/42164502`} style={{ maxWidth: '50%' }} alt="sab's pfp" />
        </div>
        <h1 class="font-bold text-red-500 text-2xl sm:text-5xl">
          404: Page not found
        </h1>
        <p class="text-lg sm:text-2xl text-gray-400">
          Whoops! You've hit a dead-end. 
        </p>
        <div class="grid sm:flex gap-3 pt-4">
          <Link href="/" class="flex justify-center sm:justify-start transition rounded-2xl shadow-lg backdrop-blur-lg bg-purple-900/80 hover:bg-purple-900 border border-purple-900 px-6 py-3 font-bold text-purple-100 md:py-4 md:px-8 text-sm md:text-lg whitespace-nowrap gap-4 items-center">
            <ChevronBack width='24'/> Go back home
          </Link>
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: '404',
  meta: [
    {
      name: 'description',
      content: 'Welcome to sab\'s website idk'
    },
    {
      name: 'og:description',
      content: 'Welcome to sab\'s website idk'
    },
    {
      name: 'og:image',
      content: 'https://avatars.githubusercontent.com/u/42164502'
    }
  ]
}