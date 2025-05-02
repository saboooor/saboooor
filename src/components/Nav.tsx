import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { LogoDiscord, LogoLuminescentFull, Nav } from '@luminescent/ui-qwik';
import { Github, HandCoins } from 'lucide-icons-qwik';

export default component$(() => {
  return (
    <Nav floating fixed colorClass="lum-bg-gray-800/50 !text-gray-100">
      <Link q:slot="start" href="/" class="lum-btn lum-bg-transparent lum-pad-equal-sm">
        <img width={32} height={32} class="h-8 w-8 rounded-md" src="https://avatars.githubusercontent.com/u/42164502" alt="sab's pfp" />
        <p>
          sab's portfolio
        </p>
      </Link>

      <a q:slot="end" href="https://luminescent.dev" class="lum-btn lum-bg-transparent">
        <div class="font-semibold flex items-center gap-1">
          <LogoLuminescentFull width={100} class="mt-1" />
        </div>
      </a>
      <div q:slot='end' class="hidden sm:flex gap-2">
        <SocialButtons />
      </div>

      <a q:slot="mobile" href="https://luminescent.dev" class="lum-btn lum-bg-transparent">
        <div class="font-semibold flex items-center gap-1">
          <LogoLuminescentFull width={100} class="mt-1" />
        </div>
      </a>
      <div q:slot='mobile' class="flex justify-evenly">
        <SocialButtons />
      </div>
    </Nav>
  );
});

export const SocialButtons = component$(() => {
  return <>
    <a href="https://github.com/saboooor" title="GitHub" class="lum-btn lum-bg-transparent lum-pad-equal-sm">
      <Github size={20} />
    </a>
    <a href="https://mc.luminescent.dev/discord" title="Discord" class="lum-btn lum-bg-transparent lum-pad-equal-sm">
      <LogoDiscord width="20" />
    </a>
    <a href="https://paypal.me/youhavebeenyoted" title="Discord" class="lum-btn lum-bg-transparent lum-pad-equal-sm">
      <HandCoins size={20} />
    </a>
  </>;
});
