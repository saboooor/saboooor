import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { ChevronDown, FileText, Hand } from 'lucide-icons-qwik';
import { SocialButtons } from '~/components/Nav';
import Projects from '~/components/Projects';
import SabCutout from '~/components/images/sab-cutout.png?jsx';

export default component$(() => {

  return <>
    <section class="grid grid-cols-2 relative mx-auto max-w-7xl px-4 items-center pt-40 min-h-screen">
      <div class="relative">
        <SabCutout class="drop-shadow-xl" />
        <div class="absolute top-0 -left-10 w-20 h-[calc(100%+2.5rem)] backdrop-blur-xl blur-lg" />
        <div class="absolute left-0 -bottom-10 h-20 w-[calc(100%+2.5rem)] backdrop-blur-xl blur-lg" />
      </div>

      <div class="relative">
        <div class="lum-card p-12 drop-shadow-xl">
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

          <div class="flex justify-between">
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

      <div class="absolute bottom-5 flex w-full justify-center animate-bounce">
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