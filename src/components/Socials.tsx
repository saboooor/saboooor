import { component$ } from '@qwik.dev/core';
import { useLocation } from '@qwik.dev/router';

import Mail from 'lucide-icons-qwik/icons/Mail';
import SiGithub from 'simple-icons-qwik/icons/SiGithub';
import SiDiscord from 'simple-icons-qwik/icons/SiDiscord';
import SiSteam from 'simple-icons-qwik/icons/SiSteam';
import SiSpotify from 'simple-icons-qwik/icons/SiSpotify';
import SiReddit from 'simple-icons-qwik/icons/SiReddit';
import SiLetterboxd from 'simple-icons-qwik/icons/SiLetterboxd';
import SiApplemuSic from 'simple-icons-qwik/icons/SiApplemuSic';
import SiYoutubemuSic from 'simple-icons-qwik/icons/SiYoutubemuSic';
import LinkedIn from './icons/LinkedIn';
import { Luminescent } from '@luminescent/icons-qwik';

const socials = [
  {
    name: 'GitHub',
    color: 'fill-white',
    username: '@saboooor',
    href: 'https://github.com/saboooor',
  },
  {
    name: 'Discord',
    color: 'fill-[#5865F2]',
    username: '@saboor.',
    href: '/discord',
  },
  {
    name: 'LinkedIn',
    color: 'fill-blue-600',
    href: 'https://www.linkedin.com/in/saboorb/',
    personal: false,
  },
  {
    name: 'Email',
    color: 'text-luminescent-300',
    username: 'hi@saboor.ca',
    href: 'mailto:hi@saboor.ca',
    personal: false,
  },
  {
    name: 'Luminescent',
    color: 'text-luminescent-200',
    href: 'https://luminescent.dev',
    personal: false,
  },
  {
    name: 'Steam',
    color: 'fill-l',
    username: '@sabudahar',
    href: 'https://steamcommunity.com/id/sabudahar',
    personal: true,
  },
  {
    name: 'Spotify',
    color: 'fill-[#1ED760]',
    href: 'https://open.spotify.com/user/onj1gkral4ceeu1mie9whf91d',
    personal: true,
  },
  {
    name: 'Youtube Music',
    color: 'fill-[#FE0132]',
    username: '@sabooor',
    href: 'https://music.youtube.com/@sabooor',
    personal: true,
  },
  {
    name: 'Apple Music',
    color: 'fill-[#FA243C]',
    username: '@sabooor',
    href: 'https://music.apple.com/profile/sabooor',
    personal: true,
  },
  {
    name: 'Reddit',
    color: 'fill-[#D93900]',
    username: 'u/saboor_',
    href: 'https://www.reddit.com/user/saboor_',
    personal: true,
  },
  {
    name: 'Letterboxd',
    color: 'fill-[#00E054]',
    username: '@sabooor',
    href: 'https://letterboxd.com/sabooor/',
    personal: true,
  },
];

// Keep explicit JSX references so Qwik can resume newly added icons after navigation.
const SocialIcon = component$(
  (props: { name: string; id: string; size: number; class?: string }) => {
    switch (props.name) {
      case 'GitHub':
        return <SiGithub {...props} />;
      case 'Discord':
        return <SiDiscord {...props} />;
      case 'LinkedIn':
        return <LinkedIn {...props} />;
      case 'Email':
        return <Mail {...props} />;
      case 'Luminescent':
        return <Luminescent {...props} />;
      case 'Steam':
        return <SiSteam {...props} />;
      case 'Spotify':
        return <SiSpotify {...props} />;
      case 'Youtube Music':
        return <SiYoutubemuSic {...props} />;
      case 'Apple Music':
        return <SiApplemuSic {...props} />;
      case 'Reddit':
        return <SiReddit {...props} />;
      case 'Letterboxd':
        return <SiLetterboxd {...props} />;
      default:
        return null;
    }
  }
);

export default component$(
  ({
    class: className,
    addLabels,
    color,
    size,
    idPrefix,
  }: {
    class?: string;
    addLabels?: 'right' | 'left';
    color?: boolean;
    size?: number;
    idPrefix: string;
  }) => {
    const loc = useLocation();

    return socials
      .filter(
        (social) =>
          social.personal === loc.url.pathname.includes('/me') ||
          social.personal === undefined
      )
      .map((social) => (
        <a
          target="_blank"
          href={social.href}
          title={social.name}
          key={`${idPrefix}-${social.name.toLowerCase().replaceAll(' ', '-')}`}
          class={{
            'lum-btn lum-bg-transparent fill-current': true,
            'p-2': !addLabels,
            [className ?? '']: className,
          }}
        >
          {addLabels === 'left' && (social.username ?? social.name)}
          <SocialIcon
            name={social.name}
            id={`${idPrefix}-${social.name.toLowerCase().replaceAll(' ', '-')}`}
            key={`${idPrefix}-${social.name.toLowerCase().replaceAll(' ', '-')}`}
            size={size ?? 20}
            class={color ? social.color : undefined}
          />
          {addLabels === 'right' && (social.username ?? social.name)}
        </a>
      ));
  }
);
