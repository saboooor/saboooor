import { component$ } from '@qwik.dev/core';
import { Credentials } from './CredentialsList';
import { Hoverable } from '@luminescent/ui-qwik';

export default component$(() => {
  return (
    <section
      id="Credentials"
      class="mx-auto mt-10 flex max-w-7xl flex-col items-center"
    >
      <div class="text-center">
        <h2 class="mb-2 text-3xl font-bold text-gray-100">Credentials</h2>
        <p class="text-gray-400">
          Here are some credentials that I have earned so far.
        </p>
      </div>

      <div class="relative mt-4 mb-4 flex w-full max-w-max flex-row flex-wrap justify-center gap-2">
        {Credentials.map(
          (cred) =>
            !cred.wip && (
              <a
                key={cred.title}
                class={{
                  'lum-card relative max-w-xl flex-row items-center transition-all duration-200!': true,
                  [cred.class]: true,
                }}
                href={cred.href}
                target="_blank"
                data-umami-event-cred={cred.title}
                onMouseMove$={(e, el) => Hoverable.onMouseMove$(e, el)}
                onMouseLeave$={(e, el) => Hoverable.onMouseLeave$(e, el)}
              >
                {cred.image}
                <div>
                  <h3 class="text-base font-bold text-gray-100 md:text-xl">
                    {cred.title}
                  </h3>
                  <p class="text-xs text-gray-500">{cred.date}</p>
                  <p class="text-xs whitespace-pre-wrap text-gray-400 md:text-sm">
                    {cred.description}
                  </p>
                </div>
              </a>
            )
        )}
      </div>
    </section>
  );
});
