import { component$ } from '@qwik.dev/core';
import { useLocation } from '@qwik.dev/router';

import { Mail } from 'lucide-icons-qwik';
import { SiGithub, SiDiscord, SiSteam, SiSpotify, SiReddit, SiLetterboxd, SiApplemuSic, SiYoutubemuSic } from 'simple-icons-qwik';
import LinkedIn from './icons/LinkedIn';
import { Luminescent } from '@luminescent/icons-qwik';

const socials = [
  {
    name: 'GitHub',
    color: 'fill-white',
    username: '@saboooor',
    href: 'https://github.com/saboooor',
    icon: SiGithub,
  },
  {
    name: 'Discord',
    color: 'fill-[#5865F2]',
    username: '@saboor.',
    href: '/discord',
    icon: SiDiscord,
  },
  {
    name: 'LinkedIn',
    color: 'fill-blue-600',
    href: 'https://www.linkedin.com/in/saboorb/',
    icon: LinkedIn,
    personal: false,
  },
  {
    name: 'Email',
    color: 'text-luminescent-300',
    username: 'hi@saboor.ca',
    href: 'mailto:hi@saboor.ca',
    icon: Mail,
    personal: false,
  },
  {
    name: 'Luminescent',
    color: 'text-luminescent-200',
    href: 'https://luminescent.dev',
    icon: Luminescent,
    personal: false,
  },
  {
    name: 'Steam',
    color: 'fill-l',
    username: '@sabudahar',
    href: 'https://steamcommunity.com/id/sabudahar',
    icon: SiSteam,
    personal: true,
  },
  {
    name: 'Spotify',
    color: 'fill-[#1ED760]',
    href: 'https://open.spotify.com/user/onj1gkral4ceeu1mie9whf91d',
    icon: SiSpotify,
    personal: true,
  },
  {
    name: 'Youtube Music',
    color: 'fill-[#FE0132]',
    username: '@sabooor',
    href: 'https://music.youtube.com/@sabooor',
    icon: SiYoutubemuSic,
    personal: true,
  },
  {
    name: 'Apple Music',
    color: 'fill-[#FA243C]',
    username: '@sabooor',
    href: 'https://music.apple.com/profile/sabooor',
    icon: SiApplemuSic,
    personal: true,
  },
  {
    name: 'Reddit',
    color: 'fill-[#D93900]',
    username: 'u/saboor_',
    href: 'https://www.reddit.com/user/saboor_',
    icon: SiReddit,
    personal: true,
  },
  {
    name: 'Letterboxd',
    color: 'fill-[#00E054]',
    username: '@sabooor',
    href: 'https://letterboxd.com/sabooor/',
    icon: SiLetterboxd,
    personal: true,
  },
];

export default component$(({ class: className, addLabels, color, size }: {
  class?: string,
  addLabels?: 'right' | 'left',
  color?: boolean,
  size?: number }) => {
  const loc = useLocation();

  return socials.filter(
    social => (social.personal === loc.url.pathname.includes('/me') || social.personal === undefined),
  ).map(social => <a target="_blank"
    href={social.href}
    title={social.name}
    key={social.name}
    class={{
      'lum-btn lum-bg-transparent fill-current': true,
      'p-2': !addLabels,
      [className ?? '']: className,
    }}
  >
    {addLabels === 'left' && (social.username ?? social.name)}
    <social.icon size={size ?? 20} class={{
      [social.color]: color,
    }} />
    {addLabels === 'right' && (social.username ?? social.name)}
  </a>);
});
