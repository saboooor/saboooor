import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$, server$ } from '@builder.io/qwik-city';
import { LogoLuminescentFull } from '@luminescent/ui-qwik';
import { ChevronDown, FileText, Hand, MapPin } from 'lucide-icons-qwik';
import ActivityCard from '~/components/Activity/ActivityCard';
import { SocialButtons } from '~/components/Nav';
import { connectLanyardSocket, getLanyardData } from '~/components/Activity/Lanyard';
import Projects from '~/components/Projects/ProjectsSection';
import Technologies from '~/components/Technologies/TechnologiesSection';
import Timeline from '~/components/Timeline/TimelineSection';
import SabCutout from '~/components/images/sab-cutout.png?jsx';

const messages = [
  'hey pookie :3',
];

export const useData = routeLoader$(async ({ request }) => {
  const isSafari = request.headers.get('user-agent')?.includes('Safari');
  return {
    lanyard: await getLanyardData(isSafari),
  };
});

const addWave = server$(async function addWave() {
  const env = this.platform.env as Env;
  const currentWaves = await env.waves.get('waves');
  if (!currentWaves) return;
  const newWaves = Number(currentWaves) + 1;
  await env.waves.put('waves', newWaves.toString());
  return newWaves;
});

export default component$(() => {
  const { value: { lanyard } } = useData();
  const discord = useSignal<any>(lanyard);
  const now = useSignal(Date.now());
  const waves = useSignal(undefined as number | undefined);

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
            <button class="lum-btn p-2 hand-wave lum-bg-transparent hover:lum-bg-luminescent-900" onClick$={async () => {
              if (waves.value) return;
              waves.value = 1;
              waves.value = await addWave();
            }}>
              <Hand size={40} class="rotate-25 w-8 sm:w-10" />
            </button>
            Hi, I'm Saboor. (aka sab)
          </h1>
          <p class={{
            'transition-all duration-300 text-gray-400 text-sm': true,
            '-mt-8 opacity-0': !waves.value,
          }}>
            {messages[Math.floor(Math.random() * messages.length)]}
            <span class={{
              'transition-opacity duration-300 pl-2': true,
              'opacity-100': waves.value && waves.value > 2,
              'opacity-0': !waves.value || waves.value <= 2,
            }}>
              {waves.value} waves so far! 👋
            </span>
          </p>
          <div class="flex">
            <a href="https://maps.app.goo.gl/mYwF9KAjWi7oEUA86" class="text-gray-400 font-semibold flex items-center gap-2 lum-btn lum-bg-transparent hover:lum-bg-luminescent-900 lum-btn-p-1 -ml-2">
              <MapPin size={20} />
              Ajax, ON. Canada
            </a>
          </div>
          {discord.value?.activities.find((activity: any) => activity.type === 4)?.state &&
            <p class="text-gray-600">
              {discord.value?.activities.find((activity: any) => activity.type === 4)?.state}
            </p>
          }
          <p class="text-gray-400 sm:text-lg">
            I'm a self-taught full-stack software developer, I have always loved technology, problem-solving, creativity, and design. Also a Culinary Arts graduate from NAIT, cooking diverse cuisines and thriving in creative, collaborative environments. I like to experiment with stuff.
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
              href="https://drive.proton.me/urls/BMQRKJSRVG#3slVDM8g2Ij4"
              title="Resume"
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
      content: 'I\'m a self-taught full-stack software developer, I have always loved technology, problem-solving, creativity, and design. Also a Culinary Arts graduate from NAIT, cooking diverse cuisines and thriving in creative, collaborative environments. I like to experiment with stuff.',
    },
    {
      name: 'og:description',
      content: 'I\'m a self-taught full-stack software developer, I have always loved technology, problem-solving, creativity, and design. Also a Culinary Arts graduate from NAIT, cooking diverse cuisines and thriving in creative, collaborative environments. I like to experiment with stuff.',
    },
    {
      name: 'og:image',
      content: 'https://avatars.githubusercontent.com/u/86643576',
    },
  ],
};
