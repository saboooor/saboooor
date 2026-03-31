import { component$, PropsOf, Signal } from '@qwik.dev/core';
import { activityTypes, convertTime } from './Lanyard';

interface ActivityCardProps extends Omit<PropsOf<'div'>, 'class'>  {
  activity: any;
  now: Signal<number>;
  fixedwidth?: boolean;
  compact?: boolean;
  class?: { [key: string]: any };
}

export default component$<ActivityCardProps>(({ activity, now, fixedwidth, compact, class: Class, ...props }) => {
  const activityType = activityTypes[activity.type as keyof typeof activityTypes];

  return <div key={activity.id} class={{
    'p-2 transition-all duration-300 lum-card relative lum-bg-gray-950/80 rounded-lum-2': true,
    'flex-1 min-w-full md:min-w-1/3 md:max-w-2/3': !fixedwidth,
    'w-80': fixedwidth,
    ...Class,
  }} {...props}>
    <div class="absolute inset-0 -z-10 w-full h-full object-cover saturate-200 rounded-lum-2 overflow-clip">
      <img class="absolute inset-0 saturate-200 -translate-y-1/3 animate-spin anim-duration-10000"
        src={activity.assets?.large_image}
        alt={activity.assets?.large_text}
        width={400}
        height={400}
      />
    </div>
    <div class="absolute inset-0 -z-10 rounded-lum-2 backdrop-blur-lg"/>
    <div class={{
      'flex gap-2 items-center group absolute top-2 right-2 z-2': true,
    }}>
      <p class={{
        'text-xs whitespace-nowrap absolute top-0 right-7 lum-btn lum-bg-gray-900/50 backdrop-blur-sm lum-btn-p-1 -translate-x-2 opacity-0 -z-1 group-hover:translate-x-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto': true,
      }}>{activityType?.text} <b>{activity.name}</b></p>
      {activityType?.icon && <activityType.icon size={24} class="lum-btn p-1" />}
    </div>
    <div class={{
      'flex flex-row items-center my-auto z-1 gap-2': true,
    }}>
      {activity.assets?.large_image &&
        <div class={{
          'relative mb-auto lum-bg-yellow-500/0 rounded-lum-4 w-16 h-16': true,
        }}>
          <img src={activity.assets.large_image} alt={activity.assets.large_text} width={80} height={80}
            class={{
              'absolute top-0 -z-1 rounded-lum-4': true,
            }} />
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
        {!compact && <>
          {activity.timestamps?.start && !activity.timestamps?.end &&
            <p class="text-violet-300/50">
              {convertTime(now.value - activity.timestamps.start)} elapsed
            </p>
          }
          {activity.timestamps?.end && !activity.timestamps?.start &&
            <p class="text-violet-300/50">
              {convertTime(now.value - activity.timestamps.end)} left
            </p>
          }
        </>}
        {activity.timestamps?.start && activity.timestamps?.end &&
          <div class="lum-bg-gray-950/10 rounded-lum-6 relative overflow-x-clip min-h-1 mr-2 mt-1">
            <div class="transition-all duration-1000 ease-linear absolute inset-0 rounded-[7px] backdrop-saturate-200 brightness-200" style={{
              width: `${((now.value - activity.timestamps.start) / (activity.timestamps.end - activity.timestamps.start)) * 100}%`,
            }} />
          </div>
        }
      </div>
    </div>
  </div>;
});