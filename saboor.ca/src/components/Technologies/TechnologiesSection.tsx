import { component$ } from '@builder.io/qwik';
import { Technologies } from './TechnologiesList';
import { Hoverable } from '@luminescent/ui-qwik';

export default component$(() => {
  return (
    <section id="technologies" class="flex flex-col mx-auto max-w-7xl items-center mt-10">
      <div class="text-center">
        <h2 class="text-gray-100 text-3xl font-bold mb-2">
          Technologies
        </h2>
        <p class="text-gray-400">
          A selection of technologies I&apos;ve worked with
        </p>
      </div>

      <div class="flex flex-row relative w-full my-10 gap-2 flex-wrap max-w-max justify-center">
        {Technologies.map((tech) => (
          <a key={tech.title} class={{
            'lum-btn flex-row items-center p-6 gap-6 rounded-lum-3 w-96 lum-hoverable': true,
            [tech.class]: true,
          }} href={tech.href} target='_blank' data-umami-event-tech={tech.title}
          onMouseMove$={(e, el) => Hoverable.onMouseMove$(e, el)}
          onMouseLeave$={(e, el) => Hoverable.onMouseLeave$(e, el)}>
            {tech.image}
            <div>
              <h3 class="text-gray-100 text-base md:text-xl font-bold">
                {tech.title}
              </h3>
              <div class="flex">
                <div class={`flex gap-1 my-1 ${tech.class} p-1 rounded-full`}>
                  <div class={{
                    'w-2 h-2 rounded-full': true,
                    [tech.class]: true,
                    'bg-red-400': tech.experience > 0,
                  }}/>
                  <div class={{
                    'w-2 h-2 rounded-full': true,
                    [tech.class]: true,
                    'bg-orange-400': tech.experience > 1,
                  }}/>
                  <div class={{
                    'w-2 h-2 rounded-full': true,
                    [tech.class]: true,
                    'bg-lime-400': tech.experience > 2,
                  }}/>
                  <div class={{
                    'w-2 h-2 rounded-full': true,
                    [tech.class]: true,
                    'bg-green-400': tech.experience > 3,
                  }}/>
                  <div class={{
                    'w-2 h-2 rounded-full': true,
                    [tech.class]: true,
                    'bg-blue-400': tech.experience > 4,
                  }}/>
                </div>
              </div>
              <p class="text-gray-400 text-xs md:text-sm whitespace-pre-wrap">
                {tech.description}
              </p>
            </div>
          </a>
        ))}
      </div>

    </section>
  );
});