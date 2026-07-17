import { component$, useContext, useSignal } from '@qwik.dev/core';
import { DocumentHead, server$ } from '@qwik.dev/router';
import ChevronDown from 'lucide-icons-qwik/icons/ChevronDown';
import FileText from 'lucide-icons-qwik/icons/FileText';
import Hand from 'lucide-icons-qwik/icons/Hand';
import MapPin from 'lucide-icons-qwik/icons/MapPin';
import ActivityCard from '~/components/Activity/ActivityCard';
import Socials from '~/components/Socials';
import Projects from '~/components/Projects/ProjectsSection';
import Technologies from '~/components/Technologies/TechnologiesSection';
import Credentials from '~/components/Credentials/CredentialsSection';
import SabCutout from '~/components/images/sab-cutout.png?jsx';
import { Bg, DiscordContext } from './layout';

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
  const customStatus = discord.value?.activities.find(
    (activity: any) => activity.type === 4
  );

  return (
    <>
      <section class="relative mx-auto flex min-h-svh max-w-7xl flex-col items-center justify-center px-4 md:flex-row lg:gap-32">
        <div
          class="relative z-10 w-1/2 drop-shadow-2xl md:z-0 md:w-full md:flex-1"
          style={{
            '--lum-border-radius': '6rem',
            '--lum-border-superellipse': '2',
          }}
        >
          <SabCutout class="shadow-outline rounded-lum-6 p-5" />
          <SabCutout class="rounded-lum-6 absolute top-0 -z-1 p-5 blur-md md:top-12 md:opacity-50 md:blur-3xl" />
        </div>

        <div class="flex flex-col gap-4 md:flex-1">
          <div class="lum-card lum-grad-bg-violet-950/10 hover:lum-bg-violet-900/10 relative pt-24 transition-all duration-300 md:p-12 md:pt-48">
            <img
              src={Bg}
              width={1280}
              height={720}
              alt="Saboor's banner"
              class="rounded-lum absolute top-0 left-0 -z-1 mb-4 max-h-128 rounded-b-none mask-b-from-60% object-cover opacity-50"
            />

            <h1 class="animate-in fade-in slide-in-from-top-5 flex items-center gap-2 text-xl font-bold duration-800 text-shadow-lg/30 md:text-3xl">
              <button
                class="lum-btn hand-wave lum-bg-transparent p-1"
                onClick$={async () => {
                  if (waves.value) return;
                  waves.value = 1;
                  waves.value = await addWave();
                }}
                data-umami-event="wave"
              >
                <Hand size={32} class="w-8 rotate-25" />
              </button>
              Hi, I'm Saboor. (aka sab)
            </h1>

            <p
              class={{
                'text-lum-text-secondary text-sm transition-all duration-300 text-shadow-lg': true,
                'pointer-events-none -my-4 opacity-0': !waves.value,
              }}
            >
              {messages[Math.floor(Math.random() * messages.length)]}
              <span
                class={{
                  'pl-1 font-semibold transition-opacity duration-300': true,
                  'opacity-100': waves.value && waves.value > 2,
                  'opacity-0': !waves.value || waves.value <= 2,
                }}
              >
                {waves.value} waves so far! 👋
              </span>
            </p>

            {customStatus?.state && !customStatus?.state.startsWith('♡') && (
              <p class="text-lum-text-secondary animate-in fade-in slide-in-from-top-5 flex items-center gap-2 font-semibold duration-950 text-shadow-black/50 text-shadow-lg">
                {customStatus.emoji && (
                  <span class="relative">
                    <img
                      src={
                        'https://cdn.discordapp.com/emojis/' +
                        customStatus.emoji.id
                      }
                      class="animate-ping opacity-20"
                      alt={customStatus.emoji.name}
                      width={20}
                      height={20}
                    />
                    <img
                      src={
                        'https://cdn.discordapp.com/emojis/' +
                        customStatus.emoji.id
                      }
                      class="absolute top-0"
                      alt={customStatus.emoji.name}
                      width={20}
                      height={20}
                    />
                  </span>
                )}
                {customStatus.state}
              </p>
            )}

            <div class="flex">
              <a
                href="https://maps.app.goo.gl/mYwF9KAjWi7oEUA86"
                target="_blank"
                data-umami-event="location"
                class="lum-btn lum-bg-gray-900/50 lum-btn-p-1 -ml-2 flex items-center gap-2 text-gray-400 backdrop-blur-xs"
              >
                <MapPin size={20} />
                Ajax, ON. Canada
              </a>
            </div>

            <p class="animate-in slide-in-from-top-5 duration-1250 md:text-lg">
              <b class="animate-in fade-in duration-1250">
                I'm a self-taught full-stack software developer
              </b>
              <br />
              <span class="text-lum-text-secondary animate-in fade-in duration-1400">
                I have always loved technology, problem-solving, creativity, and
                design. I thrive in creative, collaborative environments and
                love to experiment and test new things out.
              </span>
              <br />
              <span class="text-lum-text-secondary/50 animate-in fade-in duration-1550">
                Also a Culinary Arts graduate from NAIT.
              </span>
            </p>

            <span
              class={{
                'text-lum-text-secondary/50 animate-in fade-in slide-in-from-top-5 text-xs transition-all duration-1700': true,
                '-mt-8 opacity-0': waves.value,
              }}
            >
              psst.. click on the waving hand next to my name!
            </span>

            <hr class="border-lum-border/10 my-2" />

            <div class="flex flex-wrap justify-evenly">
              <Socials class="rounded-lum-6" />
              <a
                href="https://drive.proton.me/urls/92A8Y03APG#gfTmWrDrpDaV"
                target="_blank"
                title="Resume"
                class={{
                  'lum-btn lum-grad-bg-lum-accent hover:lum-bg-lum-accent/50 rounded-lum-6 border-lum-accent/20 hover:border-lum-accent text-sm font-bold': true,
                }}
                data-umami-event="resume"
              >
                <FileText size={20} />
                Resume
              </a>
            </div>
          </div>
          <div class="flex flex-row flex-wrap justify-evenly gap-2">
            {discord.value?.activities.map((activity: any) => {
              if (activity.type === 4) return;
              return <ActivityCard key={activity.id} activity={activity} />;
            })}
          </div>
          <div class="mt-6 hidden w-full animate-bounce justify-center md:flex">
            <a href="#projects" class="lum-btn lum-bg-transparent">
              <ChevronDown /> My Projects
            </a>
          </div>
        </div>
      </section>
      <Projects />
      <Technologies />
      <Credentials />
    </>
  );
});

export const head: DocumentHead = {
  title: "Hi, I'm Saboor. (aka sab)",
  meta: [
    {
      name: 'description',
      content:
        "I'm a self-taught full-stack software developer, I have always loved technology, problem-solving, creativity, and design. Also a Culinary Arts graduate from NAIT, cooking diverse cuisines and thriving in creative, collaborative environments. I like to experiment with stuff.",
    },
    {
      name: 'og:description',
      content:
        "I'm a self-taught full-stack software developer, I have always loved technology, problem-solving, creativity, and design. Also a Culinary Arts graduate from NAIT, cooking diverse cuisines and thriving in creative, collaborative environments. I like to experiment with stuff.",
    },
    {
      name: 'og:image',
      content: 'https://avatars.githubusercontent.com/u/42164502',
    },
  ],
};
