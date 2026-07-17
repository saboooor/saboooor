import { component$, useSignal } from '@qwik.dev/core';
import { Link, useLocation } from '@qwik.dev/router';
import Balloon from 'lucide-icons-qwik/icons/Balloon';
import Laptop from 'lucide-icons-qwik/icons/Laptop';
import Menu from 'lucide-icons-qwik/icons/Menu';
import Socials from './Socials';

export const Nav = component$(() => {
  const loc = useLocation();
  const opened = useSignal(false);

  return (
    <div
      class="fixed right-4 bottom-4 z-100"
      style={{
        '--lum-border-radius': '1.2rem',
      }}
    >
      <nav
        class={{
          'absolute right-0 bottom-full flex flex-col gap-1 transition-all': true,
          'pointer-events-none -mb-2 opacity-0': !opened.value,
        }}
      >
        <div class="lum-card lum-grad-bg-gray-900/50 flex gap-1 p-1 backdrop-blur-lg">
          <Socials class="rounded-lum-1" addLabels="right" color size={18} />
        </div>
        <div class="lum-card lum-grad-bg-gray-900/50 flex gap-1 p-1 backdrop-blur-lg">
          <Link
            href="/"
            class={{
              'lum-btn lum-bg-transparent rounded-lum-1': true,
              'lum-grad-bg-lum-accent hover:lum-bg-lum-accent':
                loc.url.pathname === '/',
            }}
          >
            <Laptop size={18} />
            Professional
          </Link>
          <Link
            href="/me"
            class={{
              'lum-btn lum-bg-transparent rounded-lum-1': true,
              'lum-grad-bg-lum-accent hover:lum-bg-lum-accent':
                loc.url.pathname.includes('/me'),
            }}
          >
            <Balloon size={18} />
            Personal
          </Link>
        </div>
      </nav>
      <button
        class="lum-btn lum-grad-bg-gray-900/50 mt-2 p-2 backdrop-blur-lg sm:p-4"
        onClick$={() => (opened.value = !opened.value)}
      >
        <Menu size={32} />
      </button>
    </div>
  );
});
