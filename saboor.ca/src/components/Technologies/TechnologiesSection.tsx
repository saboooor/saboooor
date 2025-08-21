import { component$ } from '@builder.io/qwik';
import { Technologies } from './TechnologiesList';

export default component$(() => {
  return (
    <section id="projects" class="flex flex-col mx-auto max-w-7xl items-center">
      <div class="text-center">
        <h2 class="text-gray-100 text-3xl font-bold mb-2">
          Technologies
        </h2>
        <p class="text-gray-400">
          A selection of technologies I&apos;ve worked with
        </p>
      </div>

      <div class="flex relative w-full my-10 px-8 flex-wrap justify-center">
        {Technologies.map((tech) => (
          <div key={tech.title} class="lum-card lum-bg-gray-900/50 rounded-lum-4 flex-row items-center p-4 gap-4">
            {tech.image}
            <div>
              <h3 class="text-gray-100 text-base md:text-xl font-bold">
                {tech.title}
              </h3>
              <p class="text-gray-400 text-xs md:text-sm">
                {tech.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
});