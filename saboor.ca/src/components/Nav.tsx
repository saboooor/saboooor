import { component$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import { Balloon, Laptop } from 'lucide-icons-qwik';

export const Nav = component$(() => {
  const loc = useLocation();

  return <nav class="fixed bottom-4 right-4 flex z-10" style={{ '--lum-border-radius': '0.8rem' }}>
    <div class="lum-card lum-bg-gray-900/50 backdrop-blur-lg p-1 gap-1 flex">
      <Link href="/" class={{
        'lum-btn lum-btn-p-1 lum-bg-transparent rounded-lum-1': true,
        'lum-bg-luminescent-500/20 hover:lum-bg-luminescent-600': loc.url.pathname === '/',
      }}>
        <Laptop size={18} />
        professional
      </Link>
      <Link href="/me" class={{
        'lum-btn lum-btn-p-1 lum-bg-transparent rounded-lum-1': true,
        'lum-bg-luminescent-500/20 hover:lum-bg-luminescent-600': loc.url.pathname === '/me/',
      }}>
        <Balloon size={18} />
        personal
      </Link>
    </div>
  </nav>;
});
