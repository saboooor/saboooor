import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { ChevronDown, FileText, Hand, Gamepad, Play, Music } from 'lucide-icons-qwik';
import { SocialButtons } from '~/components/Nav';
import Projects from '~/components/Projects';
import SabCutout from '~/components/images/sab-cutout.png?jsx';

function convertTime(duration: number) {
  let seconds: number | string = Math.floor((duration / 1000) % 60);
  let minutes: number | string = Math.floor((duration / (1000 * 60)) % 60);
  const hours: number | string = Math.floor((duration / (1000 * 60 * 60)) % 24);

  // pad seconds
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  // if less than 1 hour, don't show hours
  if (duration < 3600000) return minutes + ':' + seconds;

  // pad minutes
  minutes = (minutes < 10) ? '0' + minutes : minutes;

  return hours + ':' + minutes + ':' + seconds;
}

const activityType = {
  0: 'Playing',
  1: 'Streaming',
  2: 'Listening to',
  3: 'Watching',
  4: '',
  5: 'Competing In',
};

const activityTypeIcons = {
  0: <Gamepad size={20} />,
  1: <Play size={20} />,
  2: <Music size={20} />,
  3: <Play size={20} />,
  4: '',
  5: <Gamepad size={20} />,
};

async function getLanyardData(isSafari = false) {
  try {
    const data = await fetch('https://api.lanyard.rest/v1/users/249638347306303499');
    const json = await data.json() as any;
    if (!json.success) return null;

    // go through activities and parse asset links
    json.data.activities.forEach((activity: any) => {
      const app_id = activity.application_id;

      const large_image_id = activity.assets?.large_image;
      if (large_image_id) {
        const large_image = large_image_id.startsWith('mp:')
          ? large_image_id.replace('mp:', 'https://media.discordapp.net/')
          : `https://cdn.discordapp.com/app-assets/${app_id}/${large_image_id}`;
        activity.assets.large_image = large_image;
      }

      const small_image_id = activity.assets?.small_image;
      if (small_image_id) {
        const small_image = small_image_id.startsWith('mp:')
          ? small_image_id.replace('mp:', 'https://media.discordapp.net/')
          : `https://cdn.discordapp.com/app-assets/${app_id}/${small_image_id}`;
        activity.assets.small_image = small_image;
      }

      // if the image is from rise, safari shits itself
      if (isSafari && activity.assets?.large_image?.includes('rise.cider.sh')) {
        if (activity.assets.small_image) {
          activity.assets.large_image = activity.assets.small_image;
          activity.assets.small_image = undefined;
        }
        else {
          activity.assets.large_image = undefined;
        }
      }
    });

    return { ...json.data, isSafari };
  } catch (error) {
    console.error('Error fetching Lanyard data:', error);
    return null;
  }
}

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
      now.value += 1000;
    }, 1000);
    // fetch data every 5 seconds
    setInterval(() => void (async () => {
      try {
        console.log(discord.value?.isSafari);
        const lanyard = await getLanyardData(discord.value?.isSafari);
        if (lanyard) discord.value = lanyard;
      } catch (error) {
        console.error('Error fetching Lanyard data:', error);
      }
    })(), 5000);
  });

  return <>
    <section class="flex flex-col sm:flex-row relative mx-auto max-w-7xl px-4 items-center justify-center mt-20 min-h-[calc(100dvh-5rem)]">
      <div class="drop-shadow-2xl w-1/2 sm:w-full z-10 sm:flex-1">
        <SabCutout class="shadow-outline p-5 rounded-[3rem]" />
      </div>

      <div class="-mt-15 sm:mt-0 sm:flex-1 flex flex-col gap-4">
        <div class="transition-all duration-300 lum-card sm:p-12 pt-18 sm:pt-12 border-gradient-3 before:from-red-500/20 before:to-luminescent-500/20 lum-bg-gray-900 hover:lum-bg-gray-900/50">
          <h1 class="flex gap-4 items-center text-3xl font-bold">
            <div class="hand-wave">
              <Hand size={42} class="rotate-25" />
            </div>
            Hi, I'm Saboor. (aka sab)
          </h1>
          <p class="mb-2 text-gray-600">
            {discord.value.activities.find((activity: any) => activity.type === 4)?.state}
          </p>
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
        <div class="flex gap-2 flex-row flex-wrap">
          {discord.value.activities.map((activity: any) => {
            if (activity.type === 4) return;
            return <div key={activity.id} class="min-w-full md:min-w-1/3 flex-1 transition-all duration-300 lum-card relative p-4 lum-bg-gray-900/50 rounded-lum-2">
              <img
                src={activity.assets?.large_image}
                alt={activity.assets?.large_text}
                width={400}
                height={400}
                class="absolute inset-0 w-full h-full object-cover -z-2 blur-2xl"
                style={{ clipPath: 'inset(0 round var(--radius-3xl))' }}
              />
              <h3 class="flex gap-2 items-center font-bold text-xs">
                {(activityTypeIcons as any)[activity.type]}
                {(activityType as any)[activity.type]} {activity.name}
              </h3>
              <div class="flex flex-row gap-4 my-auto">
                <div class="relative mb-auto">
                  {activity.assets?.large_image && <>
                    <img src={activity.assets.large_image} alt={activity.assets.large_text} width={75} height={75} class="rounded-lum-6 border border-lum-border/20 blur-lg" />
                    <img src={activity.assets.large_image} alt={activity.assets.large_text} width={75} height={75} class="absolute top-0 rounded-lum-6 border border-lum-border/20" />
                  </>}
                  {activity.assets?.small_image &&
                    <img src={activity.assets.small_image} alt={activity.assets.small_text} width={25} height={25} class="rounded-lum-6 absolute -bottom-2 -right-2 border border-lum-border/20" />
                  }
                </div>
                <div class="flex flex-col flex-1 text-xs">
                  {activity.details &&
                    <p class="font-semibold">
                      {activity.details}
                    </p>
                  }
                  {activity.state &&
                    <p class="text-gray-400 text-ellipsis overflow-hidden">
                      {activity.state}
                    </p>
                  }
                  {activity.assets?.large_text &&
                    <p class="text-gray-400">
                      {activity.assets.large_text}
                    </p>
                  }
                  {activity.timestamps.start && !activity.timestamps.end &&
                    <p class="text-gray-400">
                      {convertTime(now.value - activity.timestamps.start)}
                    </p>
                  }
                  {activity.timestamps.end && !activity.timestamps.start &&
                    <p class="text-gray-400">
                      {convertTime(now.value - activity.timestamps.end)}
                    </p>
                  }
                  {activity.timestamps.start && activity.timestamps.end &&
                    <div class="text-white text-xs mt-1">
                      <div class="lum-bg-gray-800/10 rounded-lum-6 relative mb-1">
                        <div class="absolute inset-0 bg-gray-400/40 rounded-[7px]" style={{ width: `${((now.value - activity.timestamps.start) / (activity.timestamps.end - activity.timestamps.start)) * 100}%` }} />
                        <div class="flex justify-between px-1 p-0.5">
                          <span>{convertTime(now.value - activity.timestamps.start)}</span>
                          <span>{convertTime(activity.timestamps.end - activity.timestamps.start)}</span>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>;
          })}
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