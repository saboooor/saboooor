import { component$ } from '@builder.io/qwik';
import Socials from './Socials';

export default component$(() => {
  return (
    <footer class="flex flex-col md:flex-row justify-evenly items-center bg-gray-950/50 text-gray-400 py-8 mt-24 gap-8">
      <div class="flex flex-col items-center md:items-start gap-2">
        <p>&copy; {new Date().getFullYear()} Saboor. All rights reserved.</p>
        <p class="text-sm">
          Proudly built with Qwik and Luminescent UI - my own UI library :)
        </p>
      </div>
      <div class="flex items-center md:items-end gap-2">
        <Socials class="rounded-lum-6"/>
      </div>
    </footer>
  );
});