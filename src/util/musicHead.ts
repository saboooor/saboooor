import type { MusicActivity } from '~/components/Activity/LastMusic';

const fallbackTitle = "Hi, I'm Saboor. (aka sab)";
const fallbackDescription =
  "Welcome to Saboor's personal portfolio, music, and listening history.";
const fallbackImage = 'https://avatars.githubusercontent.com/u/42164502';

export function musicHead(
  current: MusicActivity | undefined,
  last: MusicActivity | null,
  url: URL
) {
  const song = current?.details ? current : last;
  const live = Boolean(current?.details);
  const title = song?.details
    ? `${live ? 'Now listening to' : 'Last listened to'} ${song.details}${song.state ? ` by ${song.state}` : ''} · Saboor`
    : fallbackTitle;
  const description = song?.details
    ? [
        live ? 'Currently playing' : 'Last song caught playing',
        song.details,
        song.state,
        song.assets?.large_text,
      ]
        .filter(Boolean)
        .join(' · ')
    : fallbackDescription;
  const image = song?.assets?.large_image || fallbackImage;
  let imageUrl = fallbackImage;
  try {
    const resolved = new URL(image, url);
    if (resolved.protocol === 'https:' || resolved.protocol === 'http:')
      imageUrl = resolved.href;
  } catch {
    /* Use the avatar when artwork has an invalid URL. */
  }
  return {
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Saboor' },
      { property: 'og:url', content: `${url.origin}${url.pathname}` },
      { property: 'og:description', content: description },
      { property: 'og:image', content: imageUrl },
      {
        property: 'og:image:alt',
        content: song?.assets?.large_text || song?.details || 'Saboor',
      },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
      {
        name: 'twitter:image:alt',
        content: song?.assets?.large_text || song?.details || 'Saboor',
      },
    ],
  };
}
