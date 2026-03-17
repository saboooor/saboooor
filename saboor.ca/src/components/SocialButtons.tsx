import { component$ } from '@builder.io/qwik';

import { Mail } from 'lucide-icons-qwik';
import { SiGithub, SiDiscord, SiSteam, SiSpotify, SiReddit } from 'simple-icons-qwik';
import LinkedIn from './icons/LinkedIn';
import { useLocation } from '@builder.io/qwik-city';
import { LogoLuminescent } from '@luminescent/ui-qwik';

export const SocialButtons = component$(({ large, class: className }: { large?: boolean, class?: string }) => {
  const loc = useLocation();

  return <>
    <a target="_blank"
      href="https://github.com/saboooor"
      title="GitHub"
      class={{
        'lum-btn lum-bg-transparent fill-current': true,
        'rounded-lum-4 p-3': large,
        'rounded-lum-2 p-2': !large,
        [className ?? '']: className,
      }}
    >
      <SiGithub size={large ? 32 : 20} />
    </a>
    <a target="_blank"
      href="/discord"
      title="Discord"
      class={{
        'lum-btn lum-bg-transparent fill-current': true,
        'rounded-lum-4 p-3': large,
        'rounded-lum-2 p-2': !large,
        [className ?? '']: className,
      }}
    >
      <SiDiscord size={large ? 32 : 20} />
    </a>

    {loc.url.pathname.includes('/me') && <>
      <a
        href="https://steamcommunity.com/id/sabudahar" target="_blank"
        class={{
          'lum-btn lum-bg-transparent fill-current': true,
          'rounded-lum-4 p-3': large,
          'rounded-lum-2 p-2': !large,
          [className ?? '']: className,
        }}
        title="Steam"
      >
        <SiSteam size={20} />
      </a>
      <a
        href="https://open.spotify.com/user/onj1gkral4ceeu1mie9whf91d" target="_blank"
        class={{
          'lum-btn lum-bg-transparent fill-current': true,
          'rounded-lum-4 p-3': large,
          'rounded-lum-2 p-2': !large,
          [className ?? '']: className,
        }}
        title="Spotify"
      >
        <SiSpotify size={20} />
      </a>
      <a
        href="https://www.reddit.com/user/saboor_/" target="_blank"
        class={{
          'lum-btn lum-bg-transparent fill-current': true,
          'rounded-lum-4 p-3': large,
          'rounded-lum-2 p-2': !large,
          [className ?? '']: className,
        }}
        title="Reddit"
      >
        <SiReddit size={20} />
      </a>
    </>}

    {!loc.url.pathname.includes('/me') && <>
      <a
        href="https://luminescent.dev" target="_blank"
        class={{
          'lum-btn lum-bg-transparent fill-current': true,
          'rounded-lum-4 p-3': large,
          'rounded-lum-2 p-2': !large,
          [className ?? '']: className,
        }}
        data-umami-event-link="luminescent.dev"
        title="Luminescent"
      >
        <LogoLuminescent size={20} />
      </a>
      <a target="_blank"
        href="https://www.linkedin.com/in/saboorb/"
        title="LinkedIn"
        class={{
          'lum-btn lum-bg-transparent fill-current': true,
          'rounded-lum-4 p-3': large,
          'rounded-lum-2 p-2': !large,
          [className ?? '']: className,
        }}
      >
        <LinkedIn size={large ? 32 : 20} />
      </a>
      <a target="_blank"
        href="mailto:hi@saboor.ca"
        title="Email"
        class={{
          'lum-btn lum-bg-transparent fill-current': true,
          'rounded-lum-4 p-3': large,
          'rounded-lum-2 p-2': !large,
          [className ?? '']: className,
        }}
      >
        <Mail size={large ? 32 : 20} />
      </a>
    </>}
  </>;
});
