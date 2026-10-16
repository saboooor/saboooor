import { component$, Slot, useSignal } from '@qwik.dev/core';
import { routeLoader$, useLocation } from '@qwik.dev/router';
import { Breadcrumbs } from '~/components/docs/Breadcrumbs';
import { DocsSidebar } from '~/components/docs/SideBar';
import Contributors from '~/components/docs/Contributors';
import { OnThisPage } from '~/components/docs/ThisPage';

type MDX = {
  title: string;
  contributors?: string[];
  created_at?: string;
  updated_at?: string;
};

export type MarkdownItems = Record<string, MDX>;

export const menuItemPriority: {
  [key: string]: number;
} = {
  'hello :3': 1,
};

export const getMarkdownItems = async () => {
  const rawData = await Promise.all(
    Object.entries(
      import.meta.glob<{ frontmatter?: MDX }>('/src/routes/docs/**/*.{md,mdx}')
    ).map(async ([k, v]) => {
      return [
        k
          .replace('/src/routes', '')
          .replace('index.mdx', '')
          .replace('index.md', ''),
        await v(),
      ] as const;
    })
  );

  const markdownItems: MarkdownItems = {};
  rawData.forEach(([k, v]) => {
    // skip marksdown cheatsheet and extras
    if (k.includes('extras')) return;
    if (v.frontmatter) {
      markdownItems[k] = {
        title: v.frontmatter.title,
        contributors: v.frontmatter.contributors,
        created_at: v.frontmatter.created_at,
        updated_at: v.frontmatter.updated_at,
      };
    }
  });
  return markdownItems;
};

export const useMarkdownItems = routeLoader$(() => getMarkdownItems());

export default component$(() => {
  const sideMenuOpen = useSignal(false);
  const markdownItems = useMarkdownItems();
  const { url } = useLocation();
  const currentPath = url.pathname;
  const currentItem = Object.entries(markdownItems.value).find(([k]) => {
    return currentPath == k;
  });
  const title = currentItem ? currentItem[1].title : 'Docs';
  return (
    <div class="grid min-h-dvh grid-cols-1 items-start gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[16rem_minmax(0,1fr)_16rem]">
      <DocsSidebar sideMenuOpen={sideMenuOpen} />
      <Breadcrumbs sideMenuOpen={sideMenuOpen} />
      <main class="markdown mx-auto w-full max-w-4xl min-w-0 px-4 pt-24 pb-12 sm:px-6">
        <article class="min-w-0 wrap-break-word [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24 [&_pre]:max-w-full [&_pre]:overflow-x-auto">
          <h1 class="border-b border-gray-700 pb-4 text-center font-bold">
            {title}
          </h1>
          <Slot />
          <Contributors />
        </article>
      </main>
      <OnThisPage />
    </div>
  );
});
