import { component$ } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';

import { DocumentTextOutline, LogoGithub } from "qwik-ionicons";

export default component$(() => {
  return (
    <section class="flex mx-auto max-w-6xl px-6 items-center" style={{ minHeight: 'calc(100dvh - 64px)' }}>
      <div class="text-left justify-start space-y-5 sm:max-w-[50%]">
        <div class="flex sm:hidden relative justify-start sm:ml-auto mb-5" style="width: 100%;">
          <img width={256} height={256} class="rounded-2xl ease-in-out filter drop-shadow-2xl" src={`https://avatars.githubusercontent.com/u/42164502`} style={{ maxWidth: '50%' }} alt="sab's pfp" />
        </div>
        <h1 class="font-bold text-white text-2xl sm:text-5xl">
          Welcome to sab's portfolio website
        </h1>
        <p class="text-lg sm:text-2xl text-gray-400">
          I'm a Culinary Arts student at NAIT with a passion for cooking various foods, working in fast-paced environments, and a self-taught full-stack software developer with an equal passion for technology, problem solving, creativity, and design.
        </p>
        <div class="grid sm:flex gap-3 pt-4">
          <Link href="/resume" class="flex justify-center sm:justify-start transition rounded-2xl shadow-lg backdrop-blur-lg bg-purple-900/80 hover:bg-purple-900 border border-purple-900 px-6 py-3 font-bold text-purple-100 md:py-4 md:px-8 text-sm md:text-lg whitespace-nowrap gap-4 items-center">
            <DocumentTextOutline width='24'/> View my Resume
          </Link>
          <a href="https://github.com/saboooor" class="flex justify-center sm:justify-start transition rounded-2xl shadow-lg backdrop-blur-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 px-6 py-3 font-bold text-gray-100 md:py-4 md:px-8 text-sm md:text-lg whitespace-nowrap gap-4 items-center">
            <LogoGithub width='24' class="fill-current" /> Check out my GitHub profile
          </a>
        </div>
      </div>
      <div class="hidden sm:flex relative justify-end sm:ml-auto" style={{ maxWidth: '30%', filter: 'drop-shadow(0 5rem 10rem rgb(88 28 135 / 0.7))' }}>
        <img width={384} height={384} class="rounded-2xl ease-in-out filter drop-shadow-2xl" src={`https://avatars.githubusercontent.com/u/42164502`} alt="sab's pfp" />
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: 'Home',
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