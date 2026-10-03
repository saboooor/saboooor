import type { MusicActivity } from '~/components/Activity/LastMusic';

const fallbackTitle = "Hi, I'm Saboor. (aka sab)";
const fallbackDescription =
  "See what's playing, preview songs, and like your favorites from the songs other people have caught me playing. I think my music taste is pretty good if I say so myself :p";
const fallbackImage = 'https://avatars.githubusercontent.com/u/42164502';

export function musicHead(
  current: MusicActivity | undefined,
  last: MusicActivity | null,
  url: URL
) {
  const song = current?.details ? current : last;
  const live = Boolean(current?.details);
  const title = song?.details
    ? `${song.details}${song.state ? ` - ${song.state}` : ''}`
    : fallbackTitle;
  const description = song?.details
    ? [
        live ? 'Now listening' : 'Last listened to',
        song.assets?.large_text
          ? `Album: ${song.assets.large_text}`
          : undefined,
      ]
        .filter(Boolean)
        .join(' · ') + `. ${fallbackDescription}`
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
      { property: 'og:site_name', content: fallbackTitle },
      { property: 'og:url', content: `${url.origin}${url.pathname}` },
      { property: 'og:description', content: description },
      { property: 'og:image', content: imageUrl },
      {
        property: 'og:image:alt',
        content: song?.assets?.large_text || song?.details || fallbackTitle,
      },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
      {
        name: 'twitter:image:alt',
        content: song?.assets?.large_text || song?.details || fallbackTitle,
      },
    ],
  };
}
