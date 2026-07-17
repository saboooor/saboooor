import { component$, isBrowser, useSignal, useTask$ } from '@qwik.dev/core';

import ChevronLeft from 'lucide-icons-qwik/icons/ChevronLeft';
import ChevronRight from 'lucide-icons-qwik/icons/ChevronRight';

import { Projects } from './ProjectList';

export default component$(() => {
  const translateX = useSignal(0);
  const targetX = useSignal(0);
  const rafId = useSignal<number | null>(null);
  const containerRef = useSignal<HTMLDivElement>();

  useTask$(({ track }) => {
    track(() => targetX.value);
    if (!isBrowser) return;

    const animate = () => {
      const el = containerRef.value;
      if (!el) {
        rafId.value = requestAnimationFrame(animate);
        return;
      }

      // Smooth easing
      translateX.value += (targetX.value - translateX.value) * 0.05;
      if (Math.abs(targetX.value - translateX.value) < 0.5) {
        rafId.value = null;
        return;
      }

      const width = el.scrollWidth / 2;

      // Infinite loop
      if (translateX.value > width) {
        translateX.value -= width;
        targetX.value -= width;
      }
      if (translateX.value < 0) {
        translateX.value += width;
        targetX.value += width;
      }

      // Apply transform (negative for left scroll)
      el.style.transform = `translateX(-${translateX.value}px)`;

      rafId.value = requestAnimationFrame(animate);
    };

    if (!rafId.value) rafId.value = requestAnimationFrame(animate);
  });

  return (
    <section
      id="projects"
      class="mx-auto mt-10 flex max-w-7xl flex-col items-center"
    >
      <div class="text-center">
        <h2 class="mb-2 text-3xl font-bold text-gray-100">My Projects</h2>
        <p class="text-gray-400">
          Here are some of the projects I'm working on
        </p>
      </div>

      <div class="relative my-10 flex w-full px-8">
        {/* LEFT BUTTON */}
        <button
          class="group absolute left-2 z-20 h-full cursor-pointer md:left-0"
          onClick$={() => (targetX.value -= 256) /* card width */}
        >
          <span class="lum-btn lum-grad-bg-gray-900/50 group-hover:lum-bg-gray-800 p-2 py-8 backdrop-blur-sm">
            <ChevronLeft size={48} class="h-6 w-6 md:h-12 md:w-12" />
          </span>
        </button>

        {/* RIGHT BUTTON */}
        <button
          class="group absolute right-2 z-20 h-full cursor-pointer md:right-0"
          onClick$={() => (targetX.value += 256) /* card width */}
        >
          <span class="lum-btn lum-grad-bg-gray-900/50 group-hover:lum-bg-gray-800 p-2 py-8 backdrop-blur-sm">
            <ChevronRight size={48} class="h-6 w-6 md:h-12 md:w-12" />
          </span>
        </button>

        {/* Fade edges */}
        <div class="rounded-lum pointer-events-none absolute left-8 z-10 h-full w-10 rounded-r-none bg-linear-to-r from-gray-950 to-transparent md:w-20" />
        <div class="rounded-lum pointer-events-none absolute right-8 z-10 h-full w-10 rounded-l-none bg-linear-to-l from-gray-950 to-transparent md:w-20" />

        {/* Background */}
        <div class="rounded-lum lum-grad-bg-gray-950 absolute inset-0 mx-8" />

        {/* Viewport */}
        <div class="relative flex w-full overflow-hidden p-5 md:p-10">
          {/* Scroll container */}
          <div ref={containerRef} class="flex gap-2 py-2 select-none">
            {[...Projects, ...Projects].map((project, i) => (
              <div
                key={`${project.title}-${i}`}
                class="lum-card lum-grad-bg-gray-900/50 relative max-w-48 min-w-48 gap-4 p-4 md:w-64 md:min-w-64"
              >
                {project.showcase && (
                  <img
                    src={'/showcases/' + project.showcase}
                    width={2560}
                    height={1440}
                    alt={project.title + ' screenshot'}
                    class="rounded-lum-4 border-lum-border/20 h-30 border bg-linear-to-br from-gray-800/10 to-gray-700/10 md:h-42"
                  />
                )}
                {!project.showcase && (
                  <div class="rounded-lum-4 border-lum-border/20 h-30 w-full border bg-linear-to-br from-gray-800/10 to-gray-700/10 md:h-42" />
                )}

                <div class="flex items-center gap-2">
                  {typeof project.image === 'string' ? (
                    <img
                      src={project.image}
                      alt={`${project.title} Logo`}
                      class="h-6 w-6 md:min-h-12 md:min-w-12"
                      width={48}
                      height={48}
                    />
                  ) : (
                    project.image
                  )}
                  <h3 class="text-base font-bold text-gray-100 md:text-xl">
                    {project.title}
                  </h3>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                  {project.tags.map((Tag, j) => (
                    <Tag key={j} />
                  ))}
                </div>
                <p class="text-xs text-gray-400 md:text-base">
                  {project.description}
                </p>

                <div class="mt-auto flex gap-1 md:items-center">
                  {project.buttons.map((button, i) => {
                    const roundedClass =
                      i === 0
                        ? 'rounded-r-lg'
                        : i === project.buttons.length - 1
                          ? 'rounded-l-lg'
                          : 'rounded-lg';

                    return (
                      <a
                        key={i}
                        href={button.href}
                        target="_blank"
                        draggable={false}
                        class={{
                          'lum-btn rounded-lum-4 flex flex-1 flex-col items-center justify-center gap-2 fill-current p-2': true,
                          [project.btnClass]: true,
                          [roundedClass]: project.buttons.length !== 1,
                        }}
                        title={button.title}
                      >
                        <button.icon size={24} />
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
