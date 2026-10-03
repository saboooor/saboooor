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
import {
  NowContext,
  MusicHistoryContext,
  MostLikedMusicContext,
} from '~/routes/layout';
import './ActivityCard.css';
import MusicPreview from './MusicPreview';
import MusicPlayDetails from './MusicPlayDetails';
import { musicIdentity, type MusicPlay } from './LastMusic';

import { squigglePath } from './ProgressWave';

interface ActivityCardProps extends PropsOf<'div'> {
  activity: any;
  modalRef?: Signal<HTMLDialogElement | undefined>;
  fixedwidth?: boolean;
  compact?: boolean;
  previewOpen?: boolean;
  musicPlay?: MusicPlay;
}

export default component$<ActivityCardProps>(
  ({
    activity,
    fixedwidth,
    compact,
    musicPlay: suppliedPlay,
    class: Class,
    ...props
  }) => {
    const history = useContext(MusicHistoryContext);
    const mostLiked = useContext(MostLikedMusicContext);
    const musicPlay =
      activity.type === 2
        ? history.value.find(
            (play) => musicIdentity(play.activity) === musicIdentity(activity)
          ) ||
          mostLiked.value.find(
            (play) => musicIdentity(play.activity) === musicIdentity(activity)
          ) ||
          suppliedPlay
        : undefined;
    const activityType =
      activityTypes[activity.type as keyof typeof activityTypes];
    const modalRef = useSignal<HTMLDialogElement>();
    const previewOpen = useSignal(false);
    const now = useContext(NowContext);

    return (
      <div
        key={activity.id}
        class={{
          'lum-card lum-grad-bg-gray-950/80 rounded-lum-2 relative isolate flex-row justify-between p-2 transition-all duration-300': true,
          'min-w-full flex-1 md:max-w-2/3 md:min-w-1/3': !fixedwidth,
          'w-80': fixedwidth,
          ...getClassObject(Class),
        }}
        {...props}
      >
        <button
          class="lum-btn lum-bg-transparent hover:lum-bg-transparent active:lum-bg-transparent rounded-lum-2 absolute inset-0 z-10 cursor-pointer p-0 motion-safe:active:scale-100"
          onClick$={() => {
            modalRef.value?.showModal();
            previewOpen.value = true;
          }}
          aria-label={'Expand'}
        />
        <div class="activity-art-background" aria-hidden="true">
          <img
            class="activity-card-art animation-duration-[10s] absolute inset-0 -translate-y-1/3 animate-spin"
            src={activity.assets?.large_image}
            alt={activity.assets?.large_text}
            width={400}
            height={400}
          />
          <div class="absolute inset-0 bg-gray-950/80" />
        </div>
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
            {activity.lastPlayed ? 'Last listened to' : activityType?.text}{' '}
            <b>{activity.name}</b>
          </p>
          {activityType?.icon && !musicPlay && (
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
              <div class="mt-1 mr-2 flex h-3 items-center gap-1 overflow-hidden">
                <svg
                  aria-hidden="true"
                  class="h-3 shrink-0 overflow-hidden text-violet-300 transition-[width] duration-1000 ease-linear"
                  style={{
                    width: `${Math.min(100, Math.max(0, ((now.value - activity.timestamps.start) / Math.max(1, activity.timestamps.end - activity.timestamps.start)) * 100))}%`,
                  }}
                >
                  <path
                    class="activity-progress-wave"
                    d={squigglePath}
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    vector-effect="non-scaling-stroke"
                  />
                </svg>
                <div class="h-0.5 flex-1 rounded-full bg-white/20" />
              </div>
            )}
          </div>
        </div>
        {musicPlay && (
          <div class="relative z-20">
            <MusicPlayDetails key={musicPlay.id} play={musicPlay} />
          </div>
        )}
        <dialog
          ref={modalRef}
          onClose$={() => {
            previewOpen.value = false;
          }}
          onCancel$={() => {
            previewOpen.value = false;
          }}
          class={{
            'activity-player-dialog text-lum-text m-auto hidden open:flex': true,
            'w-[calc(100%-2rem)] max-w-2xl bg-transparent p-0 shadow-2xl': true,
            'open:animate-in open:fade-in open:slide-in-from-top-8 open:duration-300': true,
            'animate-out fade-out slide-in-from-top-8 duration-300': true,
          }}
        >
          <ExpandedCard
            activity={activity}
            modalRef={modalRef}
            previewOpen={previewOpen.value}
            musicPlay={musicPlay}
          />
        </dialog>
      </div>
    );
  }
);

export const ExpandedCard = component$<ActivityCardProps>(
  ({ activity, modalRef, previewOpen, musicPlay: suppliedPlay }) => {
    const history = useContext(MusicHistoryContext);
    const mostLiked = useContext(MostLikedMusicContext);
    const musicPlay =
      activity.type === 2
        ? history.value.find(
            (play) => musicIdentity(play.activity) === musicIdentity(activity)
          ) ||
          mostLiked.value.find(
            (play) => musicIdentity(play.activity) === musicIdentity(activity)
          ) ||
          suppliedPlay
        : undefined;
    const activityType =
      activityTypes[activity.type as keyof typeof activityTypes];
    const now = useContext(NowContext);

    return (
      <div class="activity-player lum-card rounded-lum relative isolate w-full gap-6 overflow-hidden p-5 sm:p-7">
        {activity.assets?.large_image && (
          <div class="activity-art-background" aria-hidden="true">
            {[0, 1, 2, 3].map((layer) => (
              <img
                key={layer}
                class={`activity-player-art activity-player-art-${layer}`}
                src={activity.assets.large_image}
                alt={
                  activity.assets.large_text || 'Activity artwork background'
                }
                width={640}
                height={640}
              />
            ))}
            <div class="lum-grad-bg-gray-950/80 absolute inset-0 border-0 shadow-none" />
          </div>
        )}
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex min-w-0 items-center gap-3">
            {activityType?.icon && (
              <span class="lum-bg-gray-900/50 rounded-lum-4 flex h-9 w-9 shrink-0 items-center justify-center text-violet-200">
                <activityType.icon size={18} />
              </span>
            )}
            <div class="min-w-0">
              <p class="text-xs text-gray-400">
                {activity.lastPlayed
                  ? 'Last listened to'
                  : activityType?.text || 'Activity'}
              </p>
              <p class="truncate text-sm font-semibold">{activity.name}</p>
            </div>
          </div>
          {modalRef && (
            <button
              class="lum-btn lum-bg-gray-900/50 rounded-lum-4 shrink-0 cursor-pointer p-2"
              onClick$={() => {
                modalRef.value?.close();
              }}
              aria-label="Close player"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <div class="flex flex-col gap-6 sm:flex-row sm:items-center">
          {activity.assets?.large_image && (
            <a
              class="relative mx-auto block w-full max-w-64 shrink-0 sm:mx-0 sm:w-2/5"
              href={activity.assets.large_url}
            >
              <img
                src={activity.assets.large_image.replace(
                  '128x128',
                  '1024x1024'
                )}
                alt={activity.assets.large_text || activity.name}
                width={1024}
                height={1024}
                class="aspect-square w-full rounded-2xl object-cover shadow-xl ring-1 ring-white/10"
              />
              {activity.assets?.small_image && (
                <img
                  src={activity.assets.small_image}
                  alt={activity.assets.small_text || activity.name}
                  width={36}
                  height={36}
                  class="absolute -right-2 -bottom-2 rounded-xl border-4 border-gray-950"
                />
              )}
            </a>
          )}
          <div class="flex min-w-0 flex-1 flex-col gap-5">
            <div class="flex flex-col gap-1">
              {activity.details && (
                <p class="text-2xl leading-tight font-semibold tracking-tight break-words">
                  {activity.details}
                </p>
              )}
              {activity.state && (
                <p class="text-base leading-relaxed break-words text-gray-300">
                  {activity.state}
                </p>
              )}
              {activity.assets?.large_text && (
                <p class="text-sm leading-relaxed break-words text-gray-400">
                  {activity.assets.large_text}
                </p>
              )}
              {activity.timestamps?.start && !activity.timestamps?.end && (
                <p class="mt-2 text-xs text-violet-200/70">
                  {convertTime(now.value - activity.timestamps.start)} elapsed
                </p>
              )}
              {activity.timestamps?.end && !activity.timestamps?.start && (
                <p class="mt-2 text-xs text-violet-200/70">
                  {convertTime((now.value - activity.timestamps.end) * -1)} left
                </p>
              )}
            </div>
            {activity.timestamps?.start && activity.timestamps?.end && (
              <div class="pt-1">
                <div class="mb-1 flex h-3 items-center gap-1 overflow-hidden">
                  <svg
                    aria-hidden="true"
                    class="h-3 shrink-0 overflow-hidden text-violet-300 transition-[width] duration-1000 ease-linear"
                    style={{
                      width: `${Math.min(100, Math.max(0, ((now.value - activity.timestamps.start) / Math.max(1, activity.timestamps.end - activity.timestamps.start)) * 100))}%`,
                    }}
                  >
                    <path
                      class="activity-progress-wave"
                      d={squigglePath}
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      vector-effect="non-scaling-stroke"
                    />
                  </svg>
                  <div class="h-0.5 flex-1 rounded-full bg-white/20" />
                </div>
                <div class="mx-1 flex justify-between">
                  <p class="text-xs text-gray-400 tabular-nums">
                    {convertTime(now.value - activity.timestamps.start)}
                  </p>
                  <p class="text-xs text-gray-400 tabular-nums">
                    {convertTime((now.value - activity.timestamps.end) * -1)}
                  </p>
                </div>
              </div>
            )}
            {previewOpen && activity.type === 2 && activity.details && (
              <MusicPreview
                title={activity.details}
                artist={activity.state || ''}
                showProgress={
                  !(activity.timestamps?.start && activity.timestamps?.end)
                }
              />
            )}
            {musicPlay && (
              <MusicPlayDetails key={musicPlay.id} play={musicPlay} hideDate />
            )}
          </div>
        </div>
      </div>
    );
  }
);
