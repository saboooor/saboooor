import { component$ } from '@builder.io/qwik';
import { Timeline } from './Timeline';

export default component$(() => {
  return (
    <section id="projects" class="flex flex-col mx-auto max-w-5xl items-center mt-10">
      <div class="text-center">
        <h2 class="text-gray-100 text-3xl font-bold mb-2">
          Timeline
        </h2>
        <p class="text-gray-400">
          Here is a timeline of my work and projects
        </p>
      </div>

      <div class="flex relative w-full my-10 px-8">
        <div class="flex flex-col relative w-full pl-15 p-10 gap-4 items-start">
          <div class="absolute inset-10 w-1 bg-gray-700 rounded-full"/>
          {Timeline.map((yearGroup) => (
            <div key={yearGroup.year} class="flex flex-col gap-4">
              <h3 class="text-gray-100 text-lg font-bold">
                {yearGroup.year}
              </h3>
              {yearGroup.items.map((item) => (
                <div key={item.title} class={{
                  'lum-card flex-row items-center p-6 gap-6 rounded-lum-4 lum-bg-gray-800': true,
                  [item.class ?? '']: true,
                }}>
                  {item.image}
                  <div>
                    <h3 class="text-gray-100 text-base md:text-xl font-bold">
                      {item.title}
                    </h3>
                    <p class="text-gray-400 text-xs md:text-sm whitespace-pre-wrap">
                      {item.description}
                    </p>
                    <div class="flex gap-1 mt-4 justify-end">
                      {item.buttons.map((button) => (
                        <a key={button.title} href={button.href} target="_blank" class="lum-btn rounded-lum-6 lum-bg-transparent">
                          {button.icon}
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