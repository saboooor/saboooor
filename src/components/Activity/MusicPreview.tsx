import { component$, useSignal, useVisibleTask$ } from '@qwik.dev/core';
import { RangeInput } from '@luminescent/ui-qwik';
import Play from 'lucide-icons-qwik/icons/Play';
import Pause from 'lucide-icons-qwik/icons/Pause';
import Volume2 from 'lucide-icons-qwik/icons/Volume2';
import VolumeX from 'lucide-icons-qwik/icons/VolumeX';
import { convertTime } from './Lanyard';
import { squigglePath } from './ProgressWave';

interface PreviewTrack {
  trackName: string;
  artistName: string;
  previewUrl?: string;
  trackViewUrl: string;
}

const normalize = (value: string) =>
  value.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');

export default component$<{
  title: string;
  artist: string;
  showProgress?: boolean;
}>((props) => {
  const preview = useSignal<PreviewTrack>();
  const loading = useSignal(true);
  const audio = useSignal<HTMLAudioElement>();
  const playing = useSignal(false);
  const volume = useSignal(100);
  const fadeLevel = useSignal(1);
  const playbackError = useSignal(false);
  const elapsed = useSignal(0);
  const duration = useSignal(0);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track, cleanup }) => {
    const player = track(() => audio.value);
    if (!player) return;

    let frame: number | undefined;
    const stopFade = () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      frame = undefined;
    };
    const fadeIn = () => {
      stopFade();
      if (document.hidden) {
        player.pause();
        playing.value = false;
        return;
      }
      fadeLevel.value = 0;
      player.volume = 0;
      const start = performance.now();
      const step = (time: number) => {
        const progress = Math.min(1, (time - start) / 10000);
        fadeLevel.value = progress;
        player.volume = (volume.value / 100) * progress;
        if (progress < 1) frame = requestAnimationFrame(step);
        else frame = undefined;
      };
      frame = requestAnimationFrame(step);
    };
    const pause = () => {
      stopFade();
      playing.value = false;
      fadeLevel.value = 1;
      player.volume = volume.value / 100;
    };
    const pauseWhenHidden = () => {
      if (document.hidden) {
        player.pause();
        pause();
      }
    };
    player.volume = 0;
    player.addEventListener('play', pauseWhenHidden);
    player.addEventListener('playing', fadeIn);
    player.addEventListener('pause', pause);
    document.addEventListener('visibilitychange', pauseWhenHidden);
    if (document.hidden) pauseWhenHidden();
    else if (!player.paused) fadeIn();
    else
      void player.play().catch(() => {
        playing.value = false;
      });
    cleanup(() => {
      stopFade();
      document.removeEventListener('visibilitychange', pauseWhenHidden);
      player.removeEventListener('play', pauseWhenHidden);
      player.removeEventListener('playing', fadeIn);
      player.removeEventListener('pause', pause);
      player.pause();
    });
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ track, cleanup }) => {
    const title = track(() => props.title);
    const artist = track(() => props.artist);

    const controller = new AbortController();
    cleanup(() => {
      controller.abort();
      audio.value?.pause();
    });
    audio.value?.pause();
    preview.value = undefined;
    playing.value = false;
    elapsed.value = 0;
    duration.value = 0;
    playbackError.value = false;
    loading.value = true;
    try {
      const query = new URLSearchParams({
        term: `${title} ${artist}`,
        entity: 'song',
        limit: '10',
      });
      const response = await fetch(
        `https://itunes.apple.com/search?${query.toString()}`,
        {
          signal: controller.signal,
        }
      );
      if (!response.ok) throw new Error('Preview search failed');
      const data: { results: PreviewTrack[] } = await response.json();
      const match = data.results.find(
        (song) =>
          song.previewUrl &&
          normalize(song.trackName) === normalize(title) &&
          (!artist ||
            normalize(artist).includes(normalize(song.artistName)) ||
            normalize(song.artistName).includes(normalize(artist)))
      );
      if (!controller.signal.aborted) preview.value = match;
    } catch {
      // Unavailable previews should not interrupt the activity modal.
    } finally {
      if (!controller.signal.aborted) loading.value = false;
    }
  });

  return (
    <div class="flex min-w-0 flex-col items-center gap-2">
      {preview.value ? (
        <>
          <audio
            key={preview.value.previewUrl}
            ref={audio}
            src={preview.value.previewUrl}
            volume={0}
            preload="none"
            class="hidden"
            aria-label="Song preview"
            onPlay$={(_, player) => {
              playing.value = !document.hidden && !player.paused;
            }}
            onPause$={() => {
              playing.value = false;
            }}
            onEnded$={() => {
              playing.value = false;
            }}
            onTimeUpdate$={(_, player) => {
              elapsed.value = player.currentTime;
            }}
            onLoadedMetadata$={(_, player) => {
              duration.value = Number.isFinite(player.duration)
                ? player.duration
                : 0;
            }}
            onError$={() => {
              playbackError.value = true;
              playing.value = false;
            }}
          />
          {props.showProgress && (
            <div
              class="w-full pt-1"
              role="progressbar"
              aria-label="Preview progress"
              aria-valuemin={0}
              aria-valuemax={duration.value || 1}
              aria-valuenow={elapsed.value}
            >
              <div class="mb-1 flex h-3 items-center gap-1 overflow-hidden">
                <svg
                  aria-hidden="true"
                  class="h-3 shrink-0 overflow-hidden text-violet-300"
                  style={{
                    width: `${Math.min(100, Math.max(0, (elapsed.value / Math.max(1, duration.value)) * 100))}%`,
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
              <div class="mx-1 flex justify-between text-xs text-gray-400 tabular-nums">
                <span>{convertTime(elapsed.value * 1000)}</span>
                <span>{convertTime(duration.value * 1000)}</span>
              </div>
            </div>
          )}
          <div class="flex items-center gap-3">
            <button
              type="button"
              class="lum-btn lum-bg-violet-500/20 rounded-lum-4 shrink-0 p-2 text-violet-200"
              aria-label={playing.value ? 'Pause preview' : 'Play preview'}
              disabled={playbackError.value}
              onClick$={async () => {
                const player = audio.value;
                if (!player || document.hidden) return;
                if (!player.paused) player.pause();
                else {
                  try {
                    await player.play();
                  } catch {
                    playing.value = false;
                  }
                }
              }}
            >
              {playing.value ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <span class="shrink-0 text-gray-300" aria-hidden="true">
              {volume.value === 0 ? (
                <VolumeX size={16} />
              ) : (
                <Volume2 size={16} />
              )}
            </span>
            <RangeInput
              aria-label="Preview volume"
              aria-valuetext={`${volume.value}%`}
              min={0}
              max={100}
              step={1}
              value={volume.value}
              outerProps={{ class: 'w-24 sm:w-28' }}
              onInput$={(_, input) => {
                volume.value = Number(input.value);
                if (audio.value)
                  audio.value.volume = (volume.value / 100) * fadeLevel.value;
              }}
            />
          </div>
          {playbackError.value && (
            <p role="status" class="text-xs text-gray-400">
              Unable to play this preview.
            </p>
          )}
        </>
      ) : (
        <p class="text-xs text-gray-400" role="status">
          {loading.value ? 'Loading song preview…' : 'No preview available.'}
        </p>
      )}
    </div>
  );
});
