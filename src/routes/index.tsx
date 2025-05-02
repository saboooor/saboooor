import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

import { LogoGithub } from 'qwik-ionicons';

export default component$(() => {
  return (
    <section class="flex mx-auto max-w-6xl px-6 items-center" style={{ minHeight: 'calc(100dvh - 64px)' }}>
      <div class="text-left justify-start space-y-5 sm:max-w-[50%]">
        <div class="flex sm:hidden relative justify-start sm:ml-auto mb-5" style="width: 100%;">
          <img width={256} height={256} class="rounded-2xl ease-in-out filter drop-shadow-2xl" src={'https://avatars.githubusercontent.com/u/42164502'} style={{ maxWidth: '50%' }} alt="sab's pfp" />
        </div>
        <h1 class="font-bold text-white text-2xl sm:text-5xl">
          sab's portfolio
        </h1>
        <p class="text-lg sm:text-2xl text-gray-400">
          A Culinary Arts graduate from NAIT with a passion for cooking various foods, working in fast-paced and creative environments, and a self-taught full-stack software developer with an equal passion for technology, problem solving, creativity, and design.
        </p>
        <div class="grid sm:flex gap-2 pt-4">
          <a href="https://github.com/saboooor" class="lum-btn">
            <LogoGithub width='24' class="fill-current" /> Check out my GitHub profile
          </a>
        </div>
      </div>
      <div class="hidden sm:flex relative justify-end sm:ml-auto" style={{ maxWidth: '30%', filter: 'drop-shadow(0 5rem 10rem #e28c0d11)' }}>
        <img width={384} height={384} class="rounded-2xl ease-in-out filter drop-shadow-2xl" src={'https://avatars.githubusercontent.com/u/42164502'} alt="sab's pfp" />
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: 'sab\'s portfolio',
  meta: [
    {
      name: 'description',
      content: 'This is my portfolio website.',
    },
    {
      name: 'og:description',
      content: 'Welcome to sab\'s website idk',
    },
    {
      name: 'og:image',
      content: 'https://avatars.githubusercontent.com/u/42164502',
    },
  ],
};