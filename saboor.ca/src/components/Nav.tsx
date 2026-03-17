import { component$, useSignal } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import { Balloon, Laptop, Menu } from 'lucide-icons-qwik';
import Socials from './Socials';

export const Nav = component$(() => {
  const loc = useLocation();
  const opened = useSignal(false);

  return <div class="fixed bottom-4 right-4 z-100" style={{ '--lum-border-radius': '0.8rem' }}>
    <nav class={{
      'absolute bottom-full right-0 flex flex-col gap-1 transition-all': true,
      'opacity-0 pointer-events-none -mb-2': !opened.value,
    }}>
      <div class="lum-card lum-bg-gray-900/50 backdrop-blur-lg p-1 gap-1 flex">
        <Socials class="rounded-lum-1 lum-btn-p-1!" addLabels="right" color size={24} />
      </div>
      <div class="lum-card lum-bg-gray-900/50 backdrop-blur-lg p-1 gap-1 flex">
        <Link href="/" class={{
          'lum-btn lum-btn-p-1 lum-bg-transparent rounded-lum-1': true,
          'lum-bg-luminescent-500/20 hover:lum-bg-luminescent-600': loc.url.pathname === '/',
        }}>
          <Laptop size={24} />
          Professional
        </Link>
        <Link href="/me" class={{
          'lum-btn lum-btn-p-1 lum-bg-transparent rounded-lum-1': true,
          'lum-bg-luminescent-500/20 hover:lum-bg-luminescent-600': loc.url.pathname.includes('/me'),
        }}>
          <Balloon size={24} />
          Personal
        </Link>
      </div>
    </nav>
    <button class="lum-btn p-2 lum-bg-gray-900/50 backdrop-blur-lg" onClick$={() => (opened.value = !opened.value)}>
      <Menu size={24} />
    </button>
  </div>;
});
