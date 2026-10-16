import { component$, type Signal } from '@qwik.dev/core';
import { Link, useLocation } from '@qwik.dev/router';
import { createBreadcrumbs } from '~/components/docs/SideBar';
import { buildMenu } from '.';
import { useMarkdownItems } from '~/routes/docs/layout';
import ChevronRight from 'lucide-icons-qwik/icons/ChevronRight';
import Book from 'lucide-icons-qwik/icons/Book';
import Home from 'lucide-icons-qwik/icons/Home';

export const Breadcrumbs = component$<{ sideMenuOpen: Signal<boolean> }>(
  ({ sideMenuOpen }) => {
    const { url } = useLocation();
    const markdownItems = useMarkdownItems();

    const menuItems = buildMenu(markdownItems.value);
    const menu = {
      text: 'Root',
      href: '/docs/',
      items: menuItems,
    };

    const breadcrumbs = createBreadcrumbs(menu, url.pathname);

    return (
      <nav
        class="lum-card lum-grad-bg-gray-900/50 lum-btn-p-2 fixed top-4 left-4 z-50 w-fit max-w-[calc(100vw-2rem)] flex-row items-center gap-1 p-2 text-sm backdrop-blur-lg lg:left-72 lg:max-w-[calc(100vw-24rem)]"
        aria-label="Breadcrumb"
      >
        <button
          id="docs-menu-toggle"
          type="button"
          class="lum-btn lum-bg-transparent rounded-lum-1 shrink-0 p-2 lg:hidden"
          aria-label="Toggle documentation menu"
          aria-expanded={sideMenuOpen.value}
          aria-controls="docs-sidebar"
          onClick$={() => {
            sideMenuOpen.value = !sideMenuOpen.value;
          }}
        >
          <Book size={19} />
        </button>
        <Link
          href="/docs/"
          aria-label="Documentation home"
          class="lum-btn lum-bg-transparent hidden shrink-0 p-2 lg:flex"
        >
          <Home size={19} />
        </Link>
        <div class="flex min-w-0 items-center gap-1 overflow-x-auto lg:flex-wrap lg:overflow-visible">
          {breadcrumbs.map((crumb, index) => (
            <div class="flex min-w-0 items-center gap-1" key={index}>
              <ChevronRight class="h-4 w-4 shrink-0 text-gray-400" />
              <Link
                href={crumb.href}
                class={{
                  'lum-btn rounded-lum-1 min-w-0 text-sm whitespace-normal': true,
                  'lum-bg-transparent': index < breadcrumbs.length - 1,
                  'lum-grad-bg-blue/30': index === breadcrumbs.length - 1,
                }}
              >
                {crumb.text}
              </Link>
            </div>
          ))}
        </div>
      </nav>
    );
  }
);
