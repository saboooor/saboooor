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

      <div class="flex flex-row relative w-full mb-4 mt-4 gap-2 flex-wrap max-w-max justify-center">
        {Technologies.map((tech) => !tech.wip && (
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
              <p class="text-gray-400 text-xs md:text-sm whitespace-pre-wrap">
                {tech.description}
              </p>
            </div>
          </a>
        ))}
      </div>

      <p class="text-gray-400">
        A few technologies I'm dipping my toes into :)
      </p>
      <div class="flex flex-row relative w-full mb-10 mt-4 gap-2 flex-wrap max-w-max justify-center">
        {Technologies.map((tech) => tech.wip && (
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