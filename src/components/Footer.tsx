import { component$ } from '@qwik.dev/core';
import Socials from './Socials';

export default component$(() => {
  return (
    <footer class="mt-24 flex flex-col items-center justify-evenly gap-8 bg-gray-950/50 py-8 text-gray-400 md:flex-row">
      <div class="flex flex-col items-center gap-2 md:items-start">
        <p>&copy; {new Date().getFullYear()} Saboor. All rights reserved.</p>
        <p class="text-sm">
          Proudly built with Qwik and Luminescent UI - my own UI library :)
        </p>
      </div>
      <div class="flex items-center gap-2 md:items-end">
        <Socials class="rounded-lum-6" />
      </div>
    </footer>
  );
});
