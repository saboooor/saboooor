import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { LogoLuminescentFull } from '@luminescent/ui-qwik';
import { ChevronDown, FileText, Hand } from 'lucide-icons-qwik';
import ActivityCard from '~/components/Activity/ActivityCard';
import { SocialButtons } from '~/components/Nav';
import { connectLanyardSocket, getLanyardData } from '~/components/Activity/Lanyard';
import Projects from '~/components/Projects/ProjectsSection';
import Technologies from '~/components/Technologies/TechnologiesSection';
import Timeline from '~/components/Timeline/TimelineSection';
import SabCutout from '~/components/images/sab-cutout.png?jsx';

export const useLanyard = routeLoader$((req) => {
  const isSafari = req.request.headers.get('user-agent')?.includes('Safari');
  return getLanyardData(isSafari);
});

export default component$(() => {
  const { value } = useLanyard();
  const discord = useSignal<any>(value);
  const now = useSignal(Date.now());

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    setInterval(() => {
      now.value = Date.now();
    }, 1000);

    setTimeout(() => {
      connectLanyardSocket('249638347306303499', (d: any) => {
        if (!d.success) return console.error(d.error);
        console.log(d.data);
        discord.value = d.data;
      }, (error: string) => {
        console.error('Error connecting to Lanyard WebSocket:', error);
      }, discord.value.isSafari);
    }, 5000);
  });

  return <>
    <section class="flex flex-col sm:flex-row relative mx-auto max-w-7xl px-4 items-center justify-center min-h-dvh">
      <div class="relative drop-shadow-2xl w-1/2 sm:w-full z-10 sm:z-0 sm:flex-1">
        <SabCutout class="shadow-outline p-5 rounded-[3rem]" />
        <SabCutout class="absolute top-0 blur-md sm:blur-3xl -z-1 p-5 opacity-50" />
      </div>

      <div class="-mt-15 sm:mt-0 sm:flex-1 flex flex-col gap-4">
        <div class="transition-all duration-300 lum-card sm:p-12 pt-12 border-gradient-3 before:from-red-500/20 before:to-luminescent-500/20 lum-bg-gray-900 hover:lum-bg-gray-900/50">
          <h1 class="flex gap-2 items-center text-xl sm:text-3xl font-bold">
            <button class="lum-btn p-2 hand-wave lum-bg-transparent hover:lum-bg-luminescent-900">
              <Hand size={40} class="rotate-25 w-8 sm:w-10" />
            </button>
            Hi, I'm Saboor. (aka sab)
          </h1>
          {discord.value?.activities.find((activity: any) => activity.type === 4)?.state &&
            <p class="text-gray-600">
              {discord.value?.activities.find((activity: any) => activity.type === 4)?.state}
            </p>
          }
          <p class="text-gray-400 sm:text-lg">
            I'm a self-taught full-stack software developer with a passion for technology, problem-solving, creativity, and design. Also a Culinary Arts graduate from NAIT, passionate about cooking diverse cuisines and thriving in creative, collaborative environments.
          </p>

          <hr class="my-2 border-lum-border/10" />

          <div class="flex justify-evenly flex-wrap">
            <SocialButtons class="rounded-lum-6 hover:lum-bg-luminescent-900" />
            <a
              q:slot="mobile"
              href="https://luminescent.dev"
              class="lum-btn lum-bg-transparent rounded-lum-6 hover:lum-bg-luminescent-900"
            >
              <div class="flex items-center gap-1 font-semibold">
                <LogoLuminescentFull size={20} />
              </div>
            </a>
            <a
              href="https://drive.proton.me/urls/NAABHC0M1R#PVvjBuwaE4kH"
              title="LinkedIn"
              class={{
                'lum-btn lum-bg-transparent rounded-lum-6 hover:lum-bg-luminescent-900 p-2 text-sm': true,
              }}
            >
              <FileText size={20} />
              View my resume
            </a>
          </div>
        </div>
        <div class="flex gap-2 flex-row flex-wrap justify-evenly">
          {discord.value?.activities.map((activity: any) => {
            if (activity.type === 4) return;
            return <ActivityCard key={activity.id} activity={activity} now={now} />;
          })}
        </div>
        <div class="hidden sm:flex mt-6 w-full justify-center animate-bounce">
          <a href="#projects" class="lum-btn lum-bg-transparent">
            <ChevronDown /> My Projects
          </a>
        </div>
      </div>
    </section>
    <Projects />
    <Technologies />
    <Timeline />
  </>;
});

export const head: DocumentHead = {
  title: 'Hi, I\'m Saboor. (aka sab)',
  meta: [
    {
      name: 'description',
      content: 'I\'m a self-taught full-stack software developer with a passion for technology, problem-solving, creativity, and design. Also a Culinary Arts graduate from NAIT, passionate about cooking diverse cuisines and thriving in creative, collaborative environments.',
    },
    {
      name: 'og:description',
      content: 'I\'m a self-taught full-stack software developer with a passion for technology, problem-solving, creativity, and design. Also a Culinary Arts graduate from NAIT, passionate about cooking diverse cuisines and thriving in creative, collaborative environments.',
    },
    {
      name: 'og:image',
      content: 'https://avatars.githubusercontent.com/u/86643576',
    },
  ],
};