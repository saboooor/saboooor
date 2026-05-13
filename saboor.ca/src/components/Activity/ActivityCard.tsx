import { component$, PropsOf, Signal, useContext, useSignal } from '@qwik.dev/core';
import { activityTypes, convertTime } from './Lanyard';
import { getClassObject } from '@luminescent/ui-qwik';
import { X } from 'lucide-icons-qwik';
import { NowContext } from '~/routes/layout';

interface ActivityCardProps extends PropsOf<'div'>  {
  activity: any;
  modalRef?: Signal<HTMLDialogElement>;
  fixedwidth?: boolean;
  compact?: boolean;
}

export default component$<ActivityCardProps>(({ activity, fixedwidth, compact, class: Class, ...props }) => {
  const activityType = activityTypes[activity.type as keyof typeof activityTypes];
  const modalRef = useSignal<HTMLDialogElement>();
  const now = useContext(NowContext);

  return <div key={activity.id} class={{
    'p-2 transition-all duration-300 lum-card relative lum-grad-bg-gray-950/80 rounded-lum-2': true,
    'flex-1 min-w-full md:min-w-1/3 md:max-w-2/3': !fixedwidth,
    'w-80': fixedwidth,
    ...getClassObject(Class),
  }} {...props}>
    <button class="absolute inset-0 z-10 cursor-pointer rounded-lum-2" onClick$={() => {
      modalRef.value?.showModal();
    }} aria-label={'Expand'} />
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
        'text-xs whitespace-nowrap absolute top-0 right-7 lum-btn lum-grad-bg-gray-900/50 backdrop-blur-sm lum-btn-p-1 -translate-x-2 opacity-0 -z-1 group-hover:translate-x-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto': true,
      }}>{activityType?.text} <b>{activity.name}</b></p>
      {activityType?.icon && <activityType.icon size={24} class="lum-btn p-1" />}
    </div>
    <div class={{
      'flex flex-row items-center my-auto z-1 gap-2': true,
    }}>
      {activity.assets?.large_image &&
        <div class={{
          'relative mb-auto lum-grad-bg-yellow-500/0 rounded-lum-4 w-16 h-16': true,
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
          <div class="lum-grad-bg-gray-950/10 rounded-lum-6 relative overflow-x-clip min-h-1 mr-2 mt-1">
            <div class="transition-all duration-1000 ease-linear absolute inset-0 rounded-[7px] backdrop-saturate-200 brightness-200" style={{
              width: `${((now.value - activity.timestamps.start) / (activity.timestamps.end - activity.timestamps.start)) * 100}%`,
            }} />
          </div>
        }
      </div>
    </div>
    <dialog ref={modalRef}
      class={{
        'm-auto hidden open:flex text-lum-text overflow-visible': true,
        'drop-shadow-2xl max-w-2/3 lg:max-w-1/2 2xl:max-w-1/3 bg-transparent': true,
        'open:animate-in open:fade-in open:slide-in-from-top-8 open:anim-duration-300': true,
        'animate-out fade-out slide-in-from-top-8 anim-duration-300': true,
      }}>
    </dialog>
  </div>;
});

export const ExpandedCard = component$<ActivityCardProps>(({ activity, modalRef }) => {
  const activityType = activityTypes[activity.type as keyof typeof activityTypes];
  const now = useContext(NowContext);

  return <div class="w-full h-full transition-all duration-300 lum-card p-12 relative lum-grad-bg-gray-950/60 rounded-lum-2">
    <div class="absolute inset-0 -z-10 w-full h-full object-cover saturate-200 rounded-lum-2 overflow-clip">
      <img class="absolute right-0 top-0 saturate-200 animate-spin anim-duration-15000 scale-150 -translate-y-1/3"
        src={activity.assets?.large_image}
        alt={activity.assets?.large_text}
        width={1024}
        height={1024}
      />
      <img class="absolute left-0 bottom-0 saturate-200 animate-spin-cc anim-duration-20000 scale-150 translate-y-1/3"
        src={activity.assets?.large_image}
        alt={activity.assets?.large_text}
        width={1024}
        height={1024}
      />
    </div>
    <div class="absolute inset-0 -z-10 rounded-lum-2 backdrop-blur-2xl"/>

    <div class="flex mb-3 -mt-5">
      <div class={{
        'flex flex-1 gap-2 items-center top-2 right-2 z-2': true,
      }}>
        {activityType?.icon && <activityType.icon />}
        <b>{activity.name}</b>
      </div>
      {modalRef &&
        <button class="p-2 rounded-lum-2 lum-btn lum-bg-transparent" onClick$={() => {
          modalRef.value?.close();
        }} aria-label={'Close'}>
          <X />
        </button>
      }
    </div>

    {activity.assets?.large_image &&
      <a class={{
        'relative lum-grad-bg-yellow-500/0 rounded-lum-4 w-full h-auto': true,
      }} href={activity.assets.large_url}>
        <img src={activity.assets.large_image.replace('128x128', '1024x1024')} alt={activity.assets.large_text} width={1024} height={1024}
          class={{
            'w-full h-auto top-0 -z-1 rounded-lum-4': true,
          }} />
      </a>
    }
    <div class="flex flex-col flex-1 text-xs mt-7">
      {activity.details &&
        <p class="font-semibold text-2xl xl:text-4xl">
          {activity.details}
        </p>
      }
      {activity.state &&
        <p class="text-xl xl:text-2xl text-gray-400 text-ellipsis overflow-hidden">
          {activity.state}
        </p>
      }
      {activity.assets?.large_text &&
        <p class="text-lg xl:text-xl text-gray-500">
          {activity.assets.large_text}
        </p>
      }
      {activity.timestamps?.start && !activity.timestamps?.end &&
        <p class="text-violet-300/50 text-xl">
          {convertTime(now.value - activity.timestamps.start)} elapsed
        </p>
      }
      {activity.timestamps?.end && !activity.timestamps?.start &&
        <p class="text-violet-300/50 text-xl">
          {convertTime((now.value - activity.timestamps.end) * -1)} left
        </p>
      }
    </div>
    {activity.timestamps?.start && activity.timestamps?.end && <div class="mt-7">
      <div class="lum-grad-bg-gray-950/10 rounded-full relative overflow-x-clip min-h-4 mb-1">
        <div class="transition-all duration-1000 ease-linear absolute inset-0 rounded-full backdrop-saturate-200 brightness-200" style={{
          width: `${((now.value - activity.timestamps.start) / (activity.timestamps.end - activity.timestamps.start)) * 100}%`,
        }} />
      </div>
      <div class="flex justify-between mx-1">
        <p class="text-gray-400/50 text-xl">
          {convertTime(now.value - activity.timestamps.start)}
        </p>
        <p class="text-gray-400/50 text-xl">
          {convertTime((now.value - activity.timestamps.end) * -1)}
        </p>
      </div>
    </div>}
  </div>;
});