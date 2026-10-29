import { component$ } from '@qwik.dev/core';
import type { MusicPlay } from './LastMusic';

export default component$<{ play: MusicPlay; hideDate?: boolean }>(
  ({ play, hideDate }) => {
    return (
      <div class="flex flex-col items-end gap-3 text-xs text-gray-400">
        {!hideDate && (
          <p class="text-nowrap">
            <time dateTime={new Date(play.caughtAt).toISOString()}>
              {new Intl.DateTimeFormat('en-CA', {
                dateStyle: undefined,
                timeStyle: 'short',
              }).format(play.caughtAt)}{' '}
            </time>
          </p>
        )}
        <span
          class="text-nowrap tabular-nums"
          aria-label={`${play.plays} times played`}
        >
          {play.plays} {play.plays === 1 ? 'play' : 'plays'}
        </span>
      </div>
    );
  }
);
