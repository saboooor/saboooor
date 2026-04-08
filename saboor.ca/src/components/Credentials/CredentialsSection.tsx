import { component$ } from '@qwik.dev/core';
import { Credentials } from './CredentialsList';
import { Hoverable } from '@luminescent/ui-qwik';

export default component$(() => {
  return (
    <section id="Credentials" class="flex flex-col mx-auto max-w-7xl items-center mt-10">
      <div class="text-center">
        <h2 class="text-gray-100 text-3xl font-bold mb-2">
          Credentials
        </h2>
        <p class="text-gray-400">
          Here are some credentials that I have earned so far.
        </p>
      </div>

      <div class="flex flex-row relative w-full mb-4 mt-4 gap-2 flex-wrap max-w-max justify-center">
        {Credentials.map((cred) => !cred.wip && (
          <a key={cred.title} class={{
            'lum-card flex-row items-center transition-all duration-200! relative max-w-xl': true,
            [cred.class]: true,
          }} href={cred.href} target='_blank' data-umami-event-cred={cred.title}
          onMouseMove$={(e, el) => Hoverable.onMouseMove$(e, el)}
          onMouseLeave$={(e, el) => Hoverable.onMouseLeave$(e, el)}>
            {cred.image}
            <div>
              <h3 class="text-gray-100 text-base md:text-xl font-bold">
                {cred.title}
              </h3>
              <p class="text-gray-500 text-xs">
                {cred.date}
              </p>
              <p class="text-gray-400 text-xs md:text-sm whitespace-pre-wrap">
                {cred.description}
              </p>
            </div>
          </a>
        ))}
      </div>

    </section>
  );
});