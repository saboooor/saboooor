import { component$, useSignal } from '@qwik.dev/core';
import { Link, useLocation } from '@qwik.dev/router';
import { Balloon, Laptop, Menu } from 'lucide-icons-qwik';
import Socials from './Socials';

export const Nav = component$(() => {
  const loc = useLocation();
  const opened = useSignal(false);

  return <div class="fixed bottom-4 right-4 z-100" style={{
    '--lum-border-radius': '1.2rem',
  }}>
    <nav class={{
      'absolute bottom-full right-0 flex flex-col gap-1 transition-all': true,
      'opacity-0 pointer-events-none -mb-2': !opened.value,
    }}>
      <div class="lum-card lum-bg-gray-900/50 backdrop-blur-lg p-1 gap-1 flex">
        <Socials class="rounded-lum-1" addLabels="right" color size={18} />
      </div>
      <div class="lum-card lum-bg-gray-900/50 backdrop-blur-lg p-1 gap-1 flex">
        <Link href="/" class={{
          'lum-btn lum-bg-transparent rounded-lum-1': true,
          'lum-bg-lum-accent hover:lum-bg-lum-accent': loc.url.pathname === '/',
        }}>
          <Laptop size={18} />
          Professional
        </Link>
        <Link href="/me" class={{
          'lum-btn lum-bg-transparent rounded-lum-1': true,
          'lum-bg-lum-accent hover:lum-bg-lum-accent': loc.url.pathname.includes('/me'),
        }}>
          <Balloon size={18} />
          Personal
        </Link>
      </div>
    </nav>
    <button class="lum-btn p-2 sm:p-4 lum-bg-gray-900/50 backdrop-blur-lg mt-2" onClick$={() => (opened.value = !opened.value)}>
      <Menu size={32} />
    </button>
  </div>;
});
