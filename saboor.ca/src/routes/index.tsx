import { component$, useSignal, useVisibleTask$ } from '@qwik.dev/core';
import { DocumentHead, routeLoader$, server$ } from '@qwik.dev/router';
import { LuminescentFull } from '@luminescent/icons-qwik';
import { ChevronDown, FileText, Hand, MapPin } from 'lucide-icons-qwik';
import ActivityCard from '~/components/Activity/ActivityCard';
import { SocialButtons } from '~/components/Nav';
import { connectLanyardSocket, getLanyardData } from '~/components/Activity/Lanyard';
import Projects from '~/components/Projects/ProjectsSection';
import Technologies from '~/components/Technologies/TechnologiesSection';
import Credentials from '~/components/Credentials/CredentialsSection';
import SabCutout from '~/components/images/sab-cutout.png?jsx';

const messages = [
  'hey pookie :3',
  'omg hiiiii :D',
  'hope you have a fantastic day! :)',
  'add me on discord @saboor. ;)',
  'you just made my day better! ^_^',
  'thanks for stopping by! <3',
  'feel free to reach out anytime! :D',
  'omg stawwwp *blushes* >///<',
];

export const useData = routeLoader$(async ({ request }) => {
  const isSafari = request.headers.get('user-agent')?.includes('Safari');
  return {
    lanyard: await getLanyardData(isSafari),
  };
});

const addWave = server$(async function addWave() {
  const cookie = this.cookie;
  const env = this.platform.env as Env;

  const currentWaves = await env.waves.get('waves');
  if (!currentWaves) return;

  const waved = cookie.get('waved');
  if (waved) return Number(currentWaves);

  const newWaves = Number(currentWaves) + 1;
  await env.waves.put('waves', newWaves.toString());

  cookie.set('waved', 'true', { path: '/', maxAge: 60 * 60 * 24 * 7 });

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

  const customStatus = discord.value?.activities.find((activity: any) => activity.type === 4);

  return <>
    <section class="flex flex-col md:flex-row relative mx-auto max-w-7xl lg:gap-32 px-4 items-center justify-center min-h-svh">
      <div class="relative drop-shadow-2xl w-1/2 md:w-full z-10 md:z-0 md:flex-1">
        <SabCutout class="shadow-outline p-5 rounded-[3rem]" />
        <SabCutout class="absolute top-0 blur-md md:blur-3xl -z-1 p-5 opacity-50" />
      </div>

      <div class="md:flex-1 flex flex-col gap-4">
        <div class="transition-all duration-300 lum-card md:p-12 md:pt-48 border-gradient-3 before:from-red-500/10 before:to-luminescent-500/10 lum-bg-gray-900/50 hover:lum-bg-gray-900/70">
          <img src="https://dcdn.dstn.to/banners/249638347306303499?size=1280"
            width={1280} height={720}
            alt="Saboor's banner"
            class="rounded-lum rounded-b-none mb-4 object-cover absolute top-0 left-0 -z-1 mask-b-from-60%" />
          <h1 class="flex gap-2 items-center text-xl md:text-3xl font-bold text-shadow-lg text-shadow-black/50">
            <button class="lum-btn p-1 hand-wave lum-bg-transparent hover:lum-bg-luminescent-900" onClick$={async () => {
              if (waves.value) return;
              waves.value = 1;
              waves.value = await addWave();
            }} data-umami-event="wave">
              <Hand size={32} class="rotate-25 w-8" />
            </button>
            Hi, I'm Saboor. (aka sab)
          </h1>
          <p class={{
            'transition-all duration-300 text-gray-200 text-sm text-shadow-lg': true,
            '-my-4 opacity-0 pointer-events-none': !waves.value,
          }}>
            {messages[Math.floor(Math.random() * messages.length)]}
            <span class={{
              'transition-opacity duration-300 pl-1 font-semibold': true,
              'opacity-100': waves.value && waves.value > 2,
              'opacity-0': !waves.value || waves.value <= 2,
            }}>
              {waves.value} waves so far! 👋
            </span>
          </p>
          {customStatus?.state && !customStatus?.state.startsWith('♡') &&
            <p class="flex font-semibold items-center gap-2 text-gray-400 text-shadow-lg text-shadow-black/50">
              {customStatus.emoji && <span class="relative">
                <img src={
                  'https://cdn.discordapp.com/emojis/' + customStatus.emoji.id
                } class="animate-ping opacity-20"
                alt={customStatus.emoji.name} width={20} height={20} />
                <img src={
                  'https://cdn.discordapp.com/emojis/' + customStatus.emoji.id
                } class="absolute top-0"
                alt={customStatus.emoji.name} width={20} height={20} />
              </span>
              }
              {customStatus.state}
            </p>
          }
          <div class="flex">
            <a href="https://maps.app.goo.gl/mYwF9KAjWi7oEUA86" target="_blank" data-umami-event="location"
              class="text-gray-400 flex items-center gap-2 lum-btn lum-bg-transparent hover:lum-bg-luminescent-900 lum-btn-p-1 -ml-2">
              <MapPin size={20} />
              Ajax, ON. Canada
            </a>
          </div>
          <p class="text-gray-400 md:text-lg">
            I'm a self-taught full-stack software developer, I have always loved technology, problem-solving, creativity, and design. Also a Culinary Arts graduate from NAIT, cooking diverse cuisines and thriving in creative, collaborative environments. I like to experiment with stuff.
          </p>

          <span class={{
            'transition-all duration-300 text-lum-border/30 text-xs': true,
            'opacity-0 -mt-8': waves.value,
          }}>
            psst.. click on the waving hand next to my name!
          </span>

          <hr class="my-2 border-lum-border/10" />

          <div class="flex justify-evenly flex-wrap">
            <SocialButtons class="rounded-lum-6 hover:lum-bg-luminescent-900" />
            <a
              q:slot="mobile"
              href="https://luminescent.dev" target="_blank"
              class="lum-btn lum-bg-transparent rounded-lum-6 hover:lum-bg-luminescent-900"
              data-umami-event-link="luminescent.dev"
            >
              <div class="flex items-center gap-1 font-semibold">
                <LuminescentFull size={20} />
              </div>
            </a>
            <a
              href="https://drive.proton.me/urls/92A8Y03APG#gfTmWrDrpDaV" target="_blank"
              title="Resume"
              class={{
                'lum-btn lum-bg-transparent rounded-lum-6 hover:lum-bg-luminescent-900 p-2 text-sm': true,
              }}
              data-umami-event="resume"
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
        <div class="hidden md:flex mt-6 w-full justify-center animate-bounce">
          <a href="#projects" class="lum-btn lum-bg-transparent">
            <ChevronDown /> My Projects
          </a>
        </div>
      </div>
    </section>
    <Projects />
    <Technologies />
    <Credentials />
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
      content: 'https://avatars.githubusercontent.com/u/42164502',
    },
  ],
};
