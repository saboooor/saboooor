import { component$, useContext, useSignal } from '@qwik.dev/core';
import { DocumentHead, server$ } from '@qwik.dev/router';
import { ChevronDown, FileText, Hand, MapPin } from 'lucide-icons-qwik';
import ActivityCard from '~/components/Activity/ActivityCard';
import Socials from '~/components/Socials';
import Projects from '~/components/Projects/ProjectsSection';
import Technologies from '~/components/Technologies/TechnologiesSection';
import Credentials from '~/components/Credentials/CredentialsSection';
import SabCutout from '~/components/images/sab-cutout.png?jsx';
import { DiscordContext, NowContext } from './layout';
import { Background } from '~/root';

export const messages = [
  'hey pookie :3',
  'omg hiiiii :D',
  'hope you have a fantastic day! :)',
  'add me on discord @saboor. ;)',
  'you just made my day better! ^_^',
  'thanks for stopping by! <3',
  'feel free to reach out anytime! :D',
  'omg stawwwp *blushes* >///<',
];

export const addWave = server$(async function addWave() {
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
  const waves = useSignal(undefined as number | undefined);
  const discord = useContext(DiscordContext);
  const now = useContext(NowContext);
  const customStatus = discord.value?.activities.find((activity: any) => activity.type === 4);

  return <>
    <section class="flex flex-col md:flex-row relative mx-auto max-w-7xl lg:gap-32 px-4 items-center justify-center min-h-svh">
      <div class="relative drop-shadow-2xl w-1/2 md:w-full z-10 md:z-0 md:flex-1"
        style={{
          '--lum-border-radius': '6rem',
          '--lum-border-superellipse': '2',
        }}>
        <SabCutout class="shadow-outline p-5 rounded-lum-6" />
        <SabCutout class="absolute top-0 md:top-12 p-5 rounded-lum-6 blur-md md:blur-3xl -z-1 md:opacity-50" />
      </div>

      <div class="md:flex-1 flex flex-col gap-4">
        <div class="relative transition-all duration-300 lum-card md:p-12 pt-24 md:pt-48 lum-bg-violet-950/10 hover:lum-bg-violet-900/10">
          <Background
            width={1280} height={720}
            alt="Saboor's banner"
            class="rounded-lum rounded-b-none mb-4 object-cover absolute top-0 left-0 -z-1 mask-b-from-60%" />

          <h1 class="flex gap-2 items-center text-xl md:text-3xl font-bold text-shadow-lg text-shadow-black/50 animate-in fade-in slide-in-from-top-5 anim-duration-800">
            <button class="lum-btn p-1 hand-wave lum-bg-transparent" onClick$={async () => {
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
            <p class="flex font-semibold items-center gap-2 text-gray-400 text-shadow-lg text-shadow-black/50 animate-in fade-in slide-in-from-top-5 anim-duration-950">
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

          <div class="flex animate-in fade-in slide-in-from-top-5 anim-duration-1100">
            <a href="https://maps.app.goo.gl/mYwF9KAjWi7oEUA86" target="_blank" data-umami-event="location"
              class="text-gray-400 flex items-center gap-2 lum-btn lum-bg-transparent lum-btn-p-1 -ml-2">
              <MapPin size={20} />
              Ajax, ON. Canada
            </a>
          </div>

          <p class="text-gray-400 md:text-lg animate-in slide-in-from-top-5 anim-duration-1250">
            <b class="text-gray-200 animate-in fade-in anim-duration-1250">
              I'm a self-taught full-stack software developer
            </b><br />
            <span class="animate-in fade-in anim-duration-1400">
              I have always loved technology, problem-solving, creativity, and design. I thrive in creative, collaborative environments and love to experiment and test new things out.
            </span><br />
            <span class="text-gray-600 animate-in fade-in anim-duration-1550">
              Also a Culinary Arts graduate from NAIT.
            </span>
          </p>

          <span class={{
            'transition-all text-lum-border/30 text-xs animate-in fade-in slide-in-from-top-5 anim-duration-1700': true,
            'opacity-0 -mt-8': waves.value,
          }}>
            psst.. click on the waving hand next to my name!
          </span>

          <hr class="my-2 border-lum-border/10" />

          <div class="flex justify-evenly flex-wrap">
            <Socials class="rounded-lum-6" />
            <a
              href="https://drive.proton.me/urls/92A8Y03APG#gfTmWrDrpDaV" target="_blank"
              title="Resume"
              class={{
                'lum-btn lum-bg-lum-accent hover:lum-bg-lum-accent/50 rounded-lum-6 text-sm border-lum-accent/20 hover:border-lum-accent font-bold': true,
              }}
              data-umami-event="resume"
            >
              <FileText size={20} />
              Resume
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
