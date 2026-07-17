import { component$ } from '@qwik.dev/core';
import { Timeline } from './Timeline';

export default component$(() => {
  return (
    <section
      id="projects"
      class="mx-auto mt-10 flex max-w-5xl flex-col items-center"
    >
      <div class="text-center">
        <h2 class="mb-2 text-3xl font-bold text-gray-100">Timeline</h2>
        <p class="text-gray-400">Here is a timeline of my work and projects</p>
      </div>

      <div class="relative my-10 flex w-full px-8">
        <div class="relative flex w-full flex-col items-start gap-4 p-10 pl-15">
          <div class="absolute inset-10 w-1 rounded-full bg-gray-700" />
          {Timeline.map((yearGroup) => (
            <div key={yearGroup.year} class="flex flex-col gap-4">
              <h3 class="text-lg font-bold text-gray-100">{yearGroup.year}</h3>
              {yearGroup.items.map((item) => (
                <div
                  key={item.title}
                  class={{
                    'lum-card rounded-lum-4 lum-grad-bg-gray-800 flex-row items-center gap-6 p-6': true,
                    [item.class ?? '']: true,
                  }}
                >
                  {item.image}
                  <div>
                    <h3 class="text-base font-bold text-gray-100 md:text-xl">
                      {item.title}
                    </h3>
                    <p class="text-xs whitespace-pre-wrap text-gray-400 md:text-sm">
                      {item.description}
                    </p>
                    <div class="mt-4 flex justify-end gap-1">
                      {item.buttons.map((button) => (
                        <a
                          key={button.title}
                          href={button.href}
                          target="_blank"
                          class="lum-btn rounded-lum-6 lum-bg-transparent"
                        >
                          <button.icon />
                          <span class="text-xs md:text-sm">{button.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
