import {
  component$,
  PropsOf,
  Signal,
  useContext,
  useSignal,
} from '@qwik.dev/core';
import { activityTypes, convertTime } from './Lanyard';
import { getClassObject } from '@luminescent/ui-qwik';
import X from 'lucide-icons-qwik/icons/X';
import { NowContext } from '~/routes/layout';

interface ActivityCardProps extends PropsOf<'div'> {
  activity: any;
  modalRef?: Signal<HTMLDialogElement | undefined>;
  fixedwidth?: boolean;
  compact?: boolean;
}

export default component$<ActivityCardProps>(
  ({ activity, fixedwidth, compact, class: Class, ...props }) => {
    const activityType =
      activityTypes[activity.type as keyof typeof activityTypes];
    const modalRef = useSignal<HTMLDialogElement>();
    const now = useContext(NowContext);

    return (
      <div
        key={activity.id}
        class={{
          'lum-card lum-grad-bg-gray-950/80 rounded-lum-2 relative p-2 transition-all duration-300': true,
          'min-w-full flex-1 md:max-w-2/3 md:min-w-1/3': !fixedwidth,
          'w-80': fixedwidth,
          ...getClassObject(Class),
        }}
        {...props}
      >
        <button
          class="rounded-lum-2 absolute inset-0 z-10 cursor-pointer"
          onClick$={() => {
            modalRef.value?.showModal();
          }}
          aria-label={'Expand'}
        />
        <div class="rounded-lum-2 absolute inset-0 -z-10 h-full w-full overflow-clip object-cover saturate-200">
          <img
            class="animation-duration-[10s] absolute inset-0 -translate-y-1/3 animate-spin saturate-200"
            src={activity.assets?.large_image}
            alt={activity.assets?.large_text}
            width={400}
            height={400}
          />
        </div>
        <div class="rounded-lum-2 absolute inset-0 -z-10 backdrop-blur-lg" />
        <div
          class={{
            'group absolute top-2 right-2 z-2 flex items-center gap-2': true,
          }}
        >
          <p
            class={{
              'lum-btn lum-grad-bg-gray-900/50 lum-btn-p-1 pointer-events-none absolute top-0 right-7 -z-1 -translate-x-2 text-xs whitespace-nowrap opacity-0 backdrop-blur-sm group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100': true,
            }}
          >
            {activityType?.text} <b>{activity.name}</b>
          </p>
          {activityType?.icon && (
            <activityType.icon size={24} class="lum-btn p-1" />
          )}
        </div>
        <div
          class={{
            'z-1 my-auto flex flex-row items-center gap-2': true,
          }}
        >
          {activity.assets?.large_image && (
            <div
              class={{
                'lum-grad-bg-yellow-500/0 rounded-lum-4 relative mb-auto h-16 w-16': true,
              }}
            >
              <img
                src={activity.assets.large_image}
                alt={activity.assets.large_text}
                width={80}
                height={80}
                class={{
                  'rounded-lum-4 absolute top-0 -z-1': true,
                }}
              />
              {activity.assets?.small_image && (
                <img
                  src={activity.assets.small_image}
                  alt={activity.assets.small_text}
                  width={25}
                  height={25}
                  class="rounded-lum-6 border-lum-border/20 absolute -right-2 -bottom-2 border"
                />
              )}
            </div>
          )}
          <div class="flex flex-1 flex-col text-xs">
            {activity.details && (
              <p class="font-semibold">{activity.details}</p>
            )}
            {activity.state && (
              <p class="overflow-hidden text-ellipsis text-gray-400">
                {activity.state}
              </p>
            )}
            {activity.assets?.large_text && (
              <p class="text-gray-400">{activity.assets.large_text}</p>
            )}
            {!compact && (
              <>
                {activity.timestamps?.start && !activity.timestamps?.end && (
                  <p class="text-violet-300/50">
                    {convertTime(now.value - activity.timestamps.start)} elapsed
                  </p>
                )}
                {activity.timestamps?.end && !activity.timestamps?.start && (
                  <p class="text-violet-300/50">
                    {convertTime(now.value - activity.timestamps.end)} left
                  </p>
                )}
              </>
            )}
            {activity.timestamps?.start && activity.timestamps?.end && (
              <div class="lum-grad-bg-gray-950/10 rounded-lum-6 relative mt-1 mr-2 min-h-1 overflow-x-clip">
                <div
                  class="absolute inset-0 rounded-[7px] brightness-200 backdrop-saturate-200 transition-all duration-1000 ease-linear"
                  style={{
                    width: `${((now.value - activity.timestamps.start) / (activity.timestamps.end - activity.timestamps.start)) * 100}%`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <dialog
          ref={modalRef}
          class={{
            'text-lum-text m-auto hidden overflow-visible open:flex': true,
            'max-w-2/3 bg-transparent drop-shadow-2xl lg:max-w-1/2 2xl:max-w-1/3': true,
            'open:animate-in open:fade-in open:slide-in-from-top-8 open:duration-300': true,
            'animate-out fade-out slide-in-from-top-8 duration-300': true,
          }}
        >
          <ExpandedCard activity={activity} modalRef={modalRef} />
        </dialog>
      </div>
    );
  }
);

export const ExpandedCard = component$<ActivityCardProps>(
  ({ activity, modalRef }) => {
    const activityType =
      activityTypes[activity.type as keyof typeof activityTypes];
    const now = useContext(NowContext);

    return (
      <div class="lum-card lum-grad-bg-gray-950/60 rounded-lum-2 relative h-full w-full p-12 transition-all duration-300">
        <div class="rounded-lum-2 absolute inset-0 -z-10 h-full w-full overflow-clip object-cover saturate-200">
          <img
            class="animation-duration-[15s] absolute top-0 right-0 -translate-y-1/3 scale-150 animate-spin saturate-200"
            src={activity.assets?.large_image}
            alt={activity.assets?.large_text}
            width={1024}
            height={1024}
          />
          <img
            class="animate-spin-cc animation-duration-[20s] absolute bottom-0 left-0 translate-y-1/3 scale-150 saturate-200"
            src={activity.assets?.large_image}
            alt={activity.assets?.large_text}
            width={1024}
            height={1024}
          />
        </div>
        <div class="rounded-lum-2 absolute inset-0 -z-10 backdrop-blur-2xl" />

        <div class="-mt-5 mb-3 flex">
          <div
            class={{
              'top-2 right-2 z-2 flex flex-1 items-center gap-2': true,
            }}
          >
            {activityType?.icon && <activityType.icon />}
            <b>{activity.name}</b>
          </div>
          {modalRef && (
            <button
              class="rounded-lum-2 lum-btn lum-bg-transparent p-2"
              onClick$={() => {
                modalRef.value?.close();
              }}
              aria-label={'Close'}
            >
              <X />
            </button>
          )}
        </div>

        {activity.assets?.large_image && (
          <a
            class={{
              'lum-grad-bg-yellow-500/0 rounded-lum-4 relative h-auto w-full': true,
            }}
            href={activity.assets.large_url}
          >
            <img
              src={activity.assets.large_image.replace('128x128', '1024x1024')}
              alt={activity.assets.large_text}
              width={1024}
              height={1024}
              class={{
                'rounded-lum-4 top-0 -z-1 h-auto w-full': true,
              }}
            />
          </a>
        )}
        <div class="mt-7 flex flex-1 flex-col text-xs">
          {activity.details && (
            <p class="text-2xl font-semibold xl:text-4xl">{activity.details}</p>
          )}
          {activity.state && (
            <p class="overflow-hidden text-xl text-ellipsis text-gray-400 xl:text-2xl">
              {activity.state}
            </p>
          )}
          {activity.assets?.large_text && (
            <p class="text-lg text-gray-500 xl:text-xl">
              {activity.assets.large_text}
            </p>
          )}
          {activity.timestamps?.start && !activity.timestamps?.end && (
            <p class="text-xl text-violet-300/50">
              {convertTime(now.value - activity.timestamps.start)} elapsed
            </p>
          )}
          {activity.timestamps?.end && !activity.timestamps?.start && (
            <p class="text-xl text-violet-300/50">
              {convertTime((now.value - activity.timestamps.end) * -1)} left
            </p>
          )}
        </div>
        {activity.timestamps?.start && activity.timestamps?.end && (
          <div class="mt-7">
            <div class="lum-grad-bg-gray-950/10 relative mb-1 min-h-4 overflow-x-clip rounded-full">
              <div
                class="absolute inset-0 rounded-full brightness-200 backdrop-saturate-200 transition-all duration-1000 ease-linear"
                style={{
                  width: `${((now.value - activity.timestamps.start) / (activity.timestamps.end - activity.timestamps.start)) * 100}%`,
                }}
              />
            </div>
            <div class="mx-1 flex justify-between">
              <p class="text-xl text-gray-400/50">
                {convertTime(now.value - activity.timestamps.start)}
              </p>
              <p class="text-xl text-gray-400/50">
                {convertTime((now.value - activity.timestamps.end) * -1)}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);
