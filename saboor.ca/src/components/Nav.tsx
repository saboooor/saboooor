import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { LogoDiscord, LogoLuminescentFull, Nav } from '@luminescent/ui-qwik';
import { FileText, Github, Linkedin } from 'lucide-icons-qwik';
import SabSquare from '../components/images/sab.png?jsx';

export default component$(() => {
  return (
    <Nav floating fixed colorClass="lum-bg-lum-input-bg/50 !text-lum-text">
      <Link q:slot="start" href="/" class="lum-btn gap-2 lum-bg-transparent rounded-lum-2 font-bold p-0 pr-2">
        <SabSquare class="min-w-8 max-w-8 rounded-lum-2" />
        saboor.ca
      </Link>

      <Link
        q:slot="end"
        href="https://drive.proton.me/urls/NAABHC0M1R#PVvjBuwaE4kH"
        class={{
          'lum-btn lum-bg-transparent hidden sm:flex rounded-lum-2 text-sm': true,
        }}
      >
        <FileText size={20} />
        Resume
      </Link>
      <Link
        q:slot="end"
        href="https://ui.luminescent.dev"
        class={{
          'lum-btn lum-bg-transparent hidden sm:flex rounded-lum-2 text-sm': true,
        }}
      >
        <LogoLuminescentFull size={20} />
      </Link>
      <div q:slot="end" class="hidden gap-2 sm:flex">
        <SocialButtons />
      </div>

      <a
        q:slot="mobile"
        href="https://drive.proton.me/urls/NAABHC0M1R#PVvjBuwaE4kH"
        class="lum-btn lum-bg-transparent"
      >
        <FileText size={20} />
        Resume
      </a>
      <a
        q:slot="mobile"
        href="https://luminescent.dev"
        class="lum-btn lum-bg-transparent"
      >
        <div class="flex items-center gap-1 font-semibold">
          <LogoLuminescentFull size={20} />
        </div>
      </a>
      <div q:slot="mobile" class="flex justify-evenly">
        <SocialButtons />
      </div>
    </Nav>
  );
});

export const SocialButtons = component$(({ large }: { large?: boolean }) => {
  return <>
    <a
      href="https://github.com/saboooor"
      title="GitHub"
      class={{
        'lum-btn lum-bg-transparent': true,
        'rounded-lum-4 p-3': large,
        'rounded-lum-2 p-2': !large,
      }}
    >
      <Github size={large ? 32 : 20} />
    </a>
    <a
      href="/discord"
      title="Discord"
      class={{
        'lum-btn lum-bg-transparent': true,
        'rounded-lum-4 p-3': large,
        'rounded-lum-2 p-2': !large,
      }}
    >
      <LogoDiscord size={large ? 32 : 20} />
    </a>
    <a
      href="https://www.linkedin.com/in/saboorb/"
      title="LinkedIn"
      class={{
        'lum-btn lum-bg-transparent': true,
        'rounded-lum-4 p-3': large,
        'rounded-lum-2 p-2': !large,
      }}
    >
      <Linkedin size={large ? 32 : 20} />
    </a>
  </>;
});
