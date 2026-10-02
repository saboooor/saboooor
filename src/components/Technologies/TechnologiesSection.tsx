import { component$ } from '@qwik.dev/core';
import { Technologies } from './TechnologiesList';
import { Hoverable } from '@luminescent/ui-qwik';

export default component$(() => {
  return (
    <section
      id="technologies"
      class="mx-auto mt-10 flex max-w-7xl flex-col items-center"
    >
      <div class="text-center">
        <h2 class="mb-2 text-3xl font-bold text-gray-100">Technologies</h2>
        <p class="text-gray-400">
          A selection of technologies I&apos;ve worked with
        </p>
      </div>

      <div class="relative mt-4 mb-4 flex w-full max-w-max flex-row flex-wrap justify-center gap-2">
        {Technologies.map(
          (tech) =>
            !tech.wip && (
              <a
                key={tech.title}
                class={{
                  'lum-card relative w-96 flex-row items-center transition-all duration-200!': true,
                  [tech.class]: true,
                }}
                href={tech.href}
                target="_blank"
                data-umami-event-tech={tech.title}
                onMouseMove$={(e, el) => Hoverable.onMouseMove$(e, el)}
                onMouseLeave$={(e, el) => Hoverable.onMouseLeave$(e, el)}
              >
                <span class={tech.imageClass}>
                  {typeof tech.image === 'string' ? (
                    <img
                      src={tech.image}
                      alt={`${tech.title} Logo`}
                      class="mx-auto mb-5 h-25 w-25 md:h-50 md:w-50"
                      width={200}
                      height={200}
                    />
                  ) : (
                    tech.image
                  )}
                </span>
                <div>
                  <h3 class="text-base font-bold text-gray-100 md:text-xl">
                    {tech.title}
                  </h3>
                  <p class="text-xs whitespace-pre-wrap text-gray-400 md:text-sm">
                    {tech.description}
                  </p>
                </div>
              </a>
            )
        )}
      </div>

      <p class="text-gray-400">
        A few technologies I'm dipping my toes into :)
      </p>
      <div class="relative mt-4 mb-10 flex w-full max-w-max flex-row flex-wrap justify-center gap-2">
        {Technologies.map(
          (tech) =>
            tech.wip && (
              <a
                key={tech.title}
                class={{
                  'lum-card relative w-96 flex-row items-center transition-all duration-200!': true,
                  [tech.class]: true,
                }}
                href={tech.href}
                target="_blank"
                data-umami-event-tech={tech.title}
                onMouseMove$={(e, el) => Hoverable.onMouseMove$(e, el)}
                onMouseLeave$={(e, el) => Hoverable.onMouseLeave$(e, el)}
              >
                <span class={tech.imageClass}>
                  {typeof tech.image === 'string' ? (
                    <img
                      src={tech.image}
                      alt={`${tech.title} Logo`}
                      class="mx-auto mb-5 h-25 w-25 md:h-50 md:w-50"
                      width={200}
                      height={200}
                    />
                  ) : (
                    tech.image
                  )}
                </span>
                <div>
                  <h3 class="text-base font-bold text-gray-100 md:text-xl">
                    {tech.title}
                  </h3>
                  <p class="text-xs whitespace-pre-wrap text-gray-400 md:text-sm">
                    {tech.description}
                  </p>
                </div>
              </a>
            )
        )}
      </div>
    </section>
  );
});
