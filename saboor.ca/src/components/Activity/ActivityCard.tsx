import { component$, Signal } from '@builder.io/qwik';
import { activityType, activityTypeIcons, convertTime } from './Lanyard';

export default component$(({ activity, now }: {
  activity: any;
  now: Signal<number>;
}) => {
  return <div key={activity.id} class="min-w-full md:min-w-1/3 md:max-w-2/3 flex-1 transition-all duration-300 lum-card relative p-4 lum-bg-gray-950/80 rounded-lum-2">
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
      {activity.assets?.large_image &&
        <div class="relative mb-auto">
          <img src={activity.assets.large_image} alt={activity.assets.large_text} width={75} height={75} class="rounded-lum-6 border border-lum-border/20 blur-md" />
          <img src={activity.assets.large_image} alt={activity.assets.large_text} width={75} height={75} class="absolute top-0 rounded-lum-6 border border-lum-border/20" />
          {activity.assets?.small_image &&
            <img src={activity.assets.small_image} alt={activity.assets.small_text} width={25} height={25} class="rounded-lum-6 absolute -bottom-2 -right-2 border border-lum-border/20" />
          }
        </div>
      }
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
        {activity.timestamps?.start && !activity.timestamps?.end &&
          <p class="text-luminescent-400">
            {convertTime(now.value - activity.timestamps.start)} elapsed
          </p>
        }
        {activity.timestamps?.end && !activity.timestamps?.start &&
          <p class="text-luminescent-400">
            {convertTime(now.value - activity.timestamps.end)} left
          </p>
        }
        {activity.timestamps?.start && activity.timestamps?.end &&
          <div class="text-white text-xs mt-1">
            <div class="lum-bg-gray-950/10 rounded-lum-6 relative overflow-x-clip">
              <div class="flex justify-between px-1.5 py-0.5 items-center">
                <span>{convertTime(now.value - activity.timestamps.start)}</span>
                <span>{convertTime(activity.timestamps.end - activity.timestamps.start)}</span>
              </div>
              <div class="transition-all duration-1000 ease-linear absolute inset-0 rounded-[7px] backdrop-saturate-200 brightness-200 border-r border-r-lum-border/10" style={{
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