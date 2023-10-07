import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <section class="mx-auto max-w-4xl my-8" style={{ minHeight: 'calc(100dvh - 128px)' }}>
      <p class="text-center text-gray-600 mb-4">
        For privacy reasons, this resume has limited information, to request more information, please contact me.
      </p>
      <div class="sm:flex gap-8 border border-gray-800 bg-gray-800/60 rounded-xl px-12 py-14">
        <div class="justify-start">
          <div class="flex items-center gap-4">
            <img width={64} height={64} class="rounded-lg filter drop-shadow-2xl" src={`https://avatars.githubusercontent.com/u/42164502`} />
            <h1 class="font-bold text-white text-3xl">
              Muhammad Saboor, Bilal
              <p class="font-normal text-xl text-gray-200">
                (Saboor)
              </p>
            </h1>
          </div>
          <p class="mt-5 text-xl text-gray-400">
            A Culinary Arts student at NAIT with a passion for cooking various foods, working in fast-paced environments, and a self-taught full-stack software developer with an equal passion for technology, problem solving, creativity, and design.
          </p>
          <h1 class="mt-10 font-bold text-indigo-400 text-2xl">
            EXPERIENCE
          </h1>
          <p class="mt-5 text-lg text-gray-400">
            <span class="font-bold text-gray-50">Web Developer</span> — <a href="https://burgersonfleek.ca" class="underline">burgersonfleek.ca</a><br/>
            Nov 2020 - Present<br/>
            Coded and maintained website with Qwik & TailwindCSS and deployed to Cloudflare Pages
          </p>
          <p class="mt-5 text-lg text-gray-400">
            <span class="font-bold text-gray-50">Cook</span> — Burgers on Fleek<br/>
            June 2023 - August 2023
          </p>
          <h1 class="mt-10 font-bold text-indigo-400 text-2xl">
            EDUCATION
          </h1>
          <p class="mt-5 text-lg text-gray-400">
            <span class="font-bold text-gray-50">Harry Ainlay High School</span> — High School Diploma<br/>
            Sept 2019 - Jun 2022
          </p>
          <p class="mt-5 text-lg text-gray-400">
            <span class="font-bold text-gray-50">Culinary Arts</span> — Harry Ainlay<br/>
            Sept 2019 - Jan 2020 / Sept 2021 - Jan 2022
          </p>
          <p class="mt-5 text-lg text-gray-400">
            <span class="font-bold text-gray-50">Culinary Arts</span> — NAIT<br/>
            Jan 2023 - Apr 2023 / Sept 2023 - Apr 2023
          </p>
        </div>
        <div class="justify-end">
          <h1 class="mt-10 sm:mt-0 font-bold text-indigo-400 text-2xl">
            SKILLS
          </h1>
          <p class="mt-5 text-lg text-gray-400">
            Exceptional communication.
          </p>
          <p class="text-lg text-gray-400">
            Effective and efficient problem solving.
          </p>
          <p class="text-lg text-gray-400">
            Proficient short term memory.
          </p>
          <h1 class="mt-10 font-bold text-indigo-400 text-2xl">
            CERTIFICATIONS
          </h1>
          <p class="mt-5 text-lg text-gray-400">
            <span class="font-bold">
              NAIT Food Safe Handler Sanitation Certificate
            </span><br/>
            Mar 13, 2023
          </p>
          <h1 class="mt-10 font-bold text-indigo-400 text-2xl">
            LANGUAGES
          </h1>
          <p class="mt-5 text-lg text-gray-400">
            English, Urdu / Hindi
          </p>
          <h1 class="mt-10 font-bold text-indigo-400 text-2xl">
            CODE LANGUAGES & FRAMEWORKS
          </h1>
          <p class="mt-5 text-lg text-gray-400">
            JavaScript, TypeScript, NodeJS, Qwik, HTML, CSS, ExpressJS, EJS.
          </p>
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: 'Resume',
  meta: [
      {
          name: 'description',
          content: 'This is my resume, you can find all my experience here'
      },
      {
          property: 'og:description',
          content: 'This is my resume, you can find all my experience here'
      },
      {
        name: 'og:image',
        content: 'https://avatars.githubusercontent.com/u/42164502'
      }
  ]
}