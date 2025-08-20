import { component$, Signal } from '@builder.io/qwik';
import { Gamepad, Play, Music } from 'lucide-icons-qwik';

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

export async function getLanyardData(isSafari = false) {
  try {
    const data = await fetch('https://lanyard.twink.forsale/v1/users/249638347306303499');
    const json = await data.json() as any;
    if (!json.success) return null;

    // go through activities and parse asset links
    json.data.activities.forEach((activity: any) => {
      const app_id = activity.application_id;

      const large_image_id = activity.assets?.large_image;
      if (large_image_id && app_id) {
        const large_image = large_image_id.startsWith('mp:')
          ? large_image_id.replace('mp:', 'https://media.discordapp.net/')
          : `https://cdn.discordapp.com/app-assets/${app_id}/${large_image_id}`;
        activity.assets.large_image = large_image;
      }
      else if (large_image_id.startsWith('spotify:')) {
        const spotify_image = large_image_id.replace('spotify:', 'https://i.scdn.co/image/');
        activity.assets.large_image = spotify_image;
      }
      else activity.assets.large_image = undefined;

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

export default component$(({ activity, now }: {
  activity: any;
  now: Signal<number>;
}) => {
  return <div key={activity.id} class="min-w-full md:min-w-1/3 md:max-w-2/3 flex-1 transition-all duration-300 lum-card relative p-4 lum-bg-black/70 border border-gray-900 rounded-lum-2">
    <img
      src={activity.assets?.large_image}
      alt={activity.assets?.large_text}
      width={400}
      height={400}
      class="absolute inset-0 -z-2 w-full h-full object-cover blur-xl saturate-200"
      style={{ clipPath: 'inset(0 round var(--radius-3xl))' }}
    />
    <p class="flex gap-2 items-center font-bold text-xs">
      {(activityTypeIcons as any)[activity.type]}
      {(activityType as any)[activity.type]}
      <span class="-ml-1">{activity.name}</span>
    </p>
    <div class="flex flex-row gap-4 my-auto">
      <div class="relative mb-auto">
        {activity.assets?.large_image && <>
          <img src={activity.assets.large_image} alt={activity.assets.large_text} width={75} height={75} class="rounded-lum-6 border border-lum-border/20 blur-md" />
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
          <p class="text-luminescent-400">
            {convertTime(now.value - activity.timestamps.start)} elapsed
          </p>
        }
        {activity.timestamps.end && !activity.timestamps.start &&
          <p class="text-luminescent-400">
            {convertTime(now.value - activity.timestamps.end)} left
          </p>
        }
        {activity.timestamps.start && activity.timestamps.end &&
          <div class="text-white text-xs mt-1">
            <div class="lum-bg-gray-950/10 rounded-lum-6 relative overflow-x-clip">
              <div class="flex justify-between px-1.5 py-0.5 items-center">
                <span>{convertTime(now.value - activity.timestamps.start)}</span>
                <span>{convertTime(activity.timestamps.end - activity.timestamps.start)}</span>
              </div>
              <div class="absolute inset-0 rounded-[7px] backdrop-saturate-200 brightness-200 border-r border-r-lum-border/10" style={{
                width: `${((now.value - activity.timestamps.start) / (activity.timestamps.end - activity.timestamps.start)) * 100}%`,
              }}
              />
            </div>
          </div>
        }
      </div>
    </div>
  </div>;
});