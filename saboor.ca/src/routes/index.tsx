import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { ChevronDown, FileText, Hand } from 'lucide-icons-qwik';
import { SocialButtons } from '~/components/Nav';
import Projects from '~/components/Projects';
import SabCutout from '~/components/images/sab-cutout.png?jsx';

export default component$(() => {

  return <>
    <section class="flex flex-col sm:flex-row relative mx-auto max-w-7xl px-4 items-center justify-center mt-20 min-h-[calc(100dvh-5rem)]">
      <div class="drop-shadow-2xl w-1/2 sm:w-full z-10 sm:flex-1">
        <SabCutout class="shadow-outline p-5 rounded-[3rem]" />
      </div>

      <div class="-mt-15 sm:mt-0 sm:flex-1">
        <div class="transition-all duration-300 lum-card sm:p-12 pt-18 sm:pt-12 border-gradient-3 before:from-red-500/20 before:to-luminescent-500/20 lum-bg-gray-900 hover:lum-bg-gray-900/50">
          <h1 class="flex gap-4 items-center text-3xl font-bold mb-4">
            <div class="hand-wave">
              <Hand size={42} class="rotate-25" />
            </div>
            Hi, I'm Saboor. (aka sab)
          </h1>
          <p class="text-gray-400 text-lg">
            I'm a Self-taught full-stack software developer with a passion for technology, problem-solving, creativity, and design. Also a Culinary Arts graduate from NAIT, passionate about cooking diverse cuisines and thriving in creative, collaborative environments.
          </p>

          <hr class="my-4 border-lum-border/10" />

          <div class="flex justify-between flex-wrap">
            <div class="flex gap-2">
              <SocialButtons />
            </div>
            <div>
              <a
                href="https://drive.proton.me/urls/NAABHC0M1R#PVvjBuwaE4kH"
                title="LinkedIn"
                class={{
                  'lum-btn lum-bg-transparent rounded-lum-2 p-2 text-sm': true,
                }}
              >
                <FileText size={20} />
                View my resume
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="hidden sm:flex absolute bottom-5 w-full justify-center animate-bounce">
        <a href="#projects" class="lum-btn lum-bg-transparent">
          <ChevronDown /> My Projects
        </a>
      </div>
    </section>
    <Projects />
  </>;
});

export const head: DocumentHead = {
  title: 'Hi, I\'m Saboor. (aka sab)',
  meta: [
    {
      name: 'description',
      content: 'I\'m a Self-taught full-stack software developer with a passion for technology, problem-solving, creativity, and design. Also a Culinary Arts graduate from NAIT, passionate about cooking diverse cuisines and thriving in creative, collaborative environments.',
    },
    {
      name: 'og:description',
      content: 'I\'m a Self-taught full-stack software developer with a passion for technology, problem-solving, creativity, and design. Also a Culinary Arts graduate from NAIT, passionate about cooking diverse cuisines and thriving in creative, collaborative environments.',
    },
    {
      name: 'og:image',
      content: 'https://avatars.githubusercontent.com/u/86643576',
    },
  ],
};