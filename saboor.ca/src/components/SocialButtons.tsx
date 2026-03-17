import { component$ } from '@qwik.dev/core';

import { Mail } from 'lucide-icons-qwik';
import { SiGithub, SiDiscord } from 'simple-icons-qwik';
import LinkedIn from './icons/LinkedIn';

export const SocialButtons = component$(({ large, class: className }: { large?: boolean, class?: string }) => {
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
  </>;
});
