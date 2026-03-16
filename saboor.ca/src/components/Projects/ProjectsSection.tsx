import { component$, useSignal, useVisibleTask$ } from '@qwik.dev/core';

import { Blobs } from '@luminescent/ui-qwik';
import { ChevronLeft, ChevronRight } from 'lucide-icons-qwik';

import { Projects } from './ProjectList';

export default component$(() => {
  const translateX = useSignal(0);
  const targetX = useSignal(0);
  const containerRef = useSignal<HTMLDivElement>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const animate = () => {
      const el = containerRef.value;
      if (!el) {
        requestAnimationFrame(animate);
        return;
      }

      // Smooth easing
      translateX.value += (targetX.value - translateX.value) * 0.1;

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

      requestAnimationFrame(animate);
    };

    animate();
  });

  return (
    <section id="projects" class="flex flex-col mx-auto max-w-7xl items-center mt-10">
      <div class="text-center">
        <h2 class="text-gray-100 text-3xl font-bold mb-2">
          My Projects
        </h2>
        <p class="text-gray-400">
          Here are some of the projects I'm working on
          <br />
          Hover over them to see more info
        </p>
      </div>

      <div class="flex relative w-full my-10 px-8">

        {/* LEFT BUTTON */}
        <button
          class="absolute left-0 z-20 h-full group cursor-pointer"
          onClick$={() => targetX.value -= 300}
        >
          <span class="lum-btn p-2 pl-1 py-8 backdrop-blur-sm lum-bg-gray-900 group-hover:lum-bg-gray-800 drop-shadow-2xl rounded-lum-1">
            <ChevronLeft size={48} />
          </span>
        </button>

        {/* RIGHT BUTTON */}
        <button
          class="absolute right-0 z-20 h-full group cursor-pointer"
          onClick$={() => targetX.value += 300}
        >
          <span class="lum-btn p-2 pr-1 py-8 backdrop-blur-sm lum-bg-gray-900 group-hover:lum-bg-gray-800 drop-shadow-2xl">
            <ChevronRight size={48} />
          </span>
        </button>

        {/* Fade edges */}
        <div class="absolute left-8 rounded-r-none rounded-lum bg-linear-to-r from-gray-950 to-transparent h-full w-20 z-10 pointer-events-none"/>
        <div class="absolute right-8 rounded-l-none rounded-lum bg-linear-to-l from-gray-950 to-transparent h-full w-20 z-10 pointer-events-none"/>

        {/* Background */}
        <div class="absolute inset-0 rounded-lum lum-bg-gray-950 mx-8"/>

        {/* Viewport */}
        <div class="flex relative w-full overflow-hidden p-10">

          {/* Scroll container */}
          <div
            ref={containerRef}
            class="flex gap-2 py-2 select-none"
          >
            {[...Projects, ...Projects].map((project, i) => (
              <div
                key={`${project.title}-${i}`}
                class="lum-card lum-bg-gray-900/50 relative min-w-48 max-w-48 md:min-w-64 md:max-w-64"
              >
                {typeof project.image === 'string' ?
                  <img src={project.image} alt={`${project.title} Logo`} class="mx-auto mb-5 w-25 h-25 md:w-50 md:h-50" width={200} height={200} />
                  : project.image}

                <h3 class="text-gray-100 text-base md:text-xl font-bold">
                  {project.title}
                </h3>

                <div class="hidden md:flex gap-2 items-center flex-wrap">
                  {project.tags.map((Tag, j) => (
                    <Tag key={j}/>
                  ))}
                </div>

                <p class="text-gray-400 text-xs md:text-sm">
                  {project.description}
                </p>

                <Blobs
                  color={[project.color, project.color, project.color]}
                  class={{ 'absolute overflow-clip rounded-lg -z-10': true }}
                  style={{ transform: 'translateZ(-10px)' }}
                />

                {/* Hover overlay */}
                <div class="group lum-card lum-bg-gray-900/30 absolute inset-0 p-2 gap-2 w-full h-full z-10 backdrop-blur-md opacity-0 hover:opacity-100 transition duration-200">

                  {project.buttons.map((button, i) => (
                    <a key={i} href={button.href} draggable={false} class={{
                      'lum-btn pointer-events-none group-hover:pointer-events-auto h-full w-full rounded-lum-2 lum-bg-transparent flex flex-col justify-center transition-all items-center gap-2 fill-current': true,
                      [project.btnClass]: project.btnClass,
                    }}>
                      <button.icon size={24} />
                      {button.title}
                    </a>
                  ))}

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
});