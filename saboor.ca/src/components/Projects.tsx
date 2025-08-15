import { component$, useVisibleTask$ } from '@builder.io/qwik';

import { Blobs, LogoBirdflop, LogoLuminescent, LogoDiscord } from '@luminescent/ui-qwik';
import { ChevronLeft, ChevronRight, Github, Globe } from 'lucide-icons-qwik';

import Cactie from '../components/images/Cactie.png?jsx';
import Luminara from '../components/images/Luminara.png?jsx';
import { MCTag, QwikTag, ReactTag } from '~/components/Tags';

export default component$(() => {
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const container = document.getElementById('auto-scroll-container')!;
    const offsetChild = document.getElementById('offset')!;
    const scrollLeft = document.getElementById('scroll-left')!;
    const scrollRight = document.getElementById('scroll-right')!;

    const padding = 10; // Padding to add to the offset

    let hovering = false;
    let scrollMultiplier = 1;

    let translateX = 0;
    // Automatically scroll without user interaction, append each child when it moves out of the container for infinite scrolling
    const scrollInterval = setInterval(() => {
      if (hovering) return;
      translateX += 60 * scrollMultiplier; // Adjust speed as needed
      container.style.transform = `translateX(-${translateX}px)`;
      // append the first child to the end of the container when it moves out of view
      const secondChild = container.children[1] as HTMLElement;
      const offset = (secondChild?.clientWidth * 2) + offsetChild.clientWidth + padding;
      const offsetWidth = secondChild?.clientWidth + offsetChild.clientWidth + padding;
      if (translateX > offset) {
        container.appendChild(secondChild);
        // add width of second child to offset
        offsetChild.style.width = `${offsetWidth}px`;
      }
    }, 500);

    // check if container is being hovered
    container.addEventListener('mouseenter', () => {
      hovering = true;
    });
    container.addEventListener('mouseleave', () => {
      hovering = false;
    });

    // check if container is being hovered
    scrollLeft.addEventListener('mouseenter', () => {
      scrollMultiplier = -3;
    });
    scrollLeft.addEventListener('click', () => {
      scrollMultiplier += -1;
    });
    scrollLeft.addEventListener('mouseleave', () => {
      scrollMultiplier = 1;
    });

    // check if container is being hovered
    scrollRight.addEventListener('mouseenter', () => {
      scrollMultiplier = 3;
    });
    scrollRight.addEventListener('click', () => {
      scrollMultiplier += 1;
    });
    scrollRight.addEventListener('mouseleave', () => {
      scrollMultiplier = 1;
    });

    return () => clearInterval(scrollInterval); // Cleanup on component unmount
  });

  return (
    <section id="projects" class="flex flex-col mx-auto max-w-7xl px-4 items-center pt-40">
      <div class="text-center">
        <h2 class="text-gray-100 text-3xl font-bold mb-2">
          My Projects
        </h2>
        <p class="text-gray-400">
          Here are some of the projects I'm working on<br/>
          Hover over them to see more info<br/>
        </p>
      </div>

      <div class="flex relative w-full my-10">
        <div class="group" id="scroll-left">
          <button class="absolute -left-20 lum-btn lum-bg-transparent hover:bg-luminescent-900/10 z-100 h-full rounded-full blur-md backdrop-blur-xl w-30"/>
          <ChevronLeft size={76} class="absolute -left-15 flex items-center group z-100 h-full pointer-events-none transition-all duration-300 group-hover:scale-150"/>
        </div>

        <div class="group" id="scroll-right">
          <button class="absolute -right-20 lum-btn lum-bg-transparent hover:bg-luminescent-900/10 z-100 h-full rounded-full blur-md backdrop-blur-xl w-30"/>
          <ChevronRight size={76} class="absolute -right-15 flex items-center group z-100 h-full pointer-events-none transition-all duration-300 group-hover:scale-150"/>
        </div>

        <div class="flex relative w-full overflow-x-hidden my-10">
          <div id="auto-scroll-container" class="flex gap-2 py-2 select-none transition-transform duration-500 ease-linear">
            <div id="offset"/>
            <div class="lum-card lum-bg-gray-800/30 relative min-w-76 max-w-76">
              <LogoBirdflop size={200} class="mx-auto mb-5" fillGradient={['#54daf4', '#545eb6']}/>
              <h3 class="text-gray-100 text-xl font-bold">
                Birdflop
              </h3>
              <div class="flex gap-2 items-center flex-wrap">
                <QwikTag /><ReactTag /><MCTag />
              </div>
              <p class="text-gray-400 text-sm">
                A registered 501(c)(3) nonprofit server host aiming to provide affordable and accessible hosting and resources.
              </p>
              <Blobs color='cyan' class={{ 'absolute overflow-clip rounded-lg -z-10': true }} style={{ transform: 'translateZ(-10px)' }}/>
              <div class={{
                'lum-card lum-bg-gray-900/50 absolute inset-0 !p-2 !gap-2 !border-0 !text-white w-full h-full z-10 backdrop-blur-xl transition duration-300 hover:duration-75 ease-out opacity-0 hover:opacity-100': true,
                '[&>*]:h-full [&>*]:w-full [&>*]:lum-btn [&>*]:rounded-lum-2 [&>*]:lum-bg-transparent [&>*]:hover:lum-bg-cyan-900/20 [&>*]:flex [&>*]:flex-col [&>*]:justify-center [&>*]:transition-all [&>*]:items-center [&>*]:gap-2': true,
              }}>
                <a href={'https://birdflop.com'} draggable={false}>
                  <Globe size={24} />
                  Visit page
                </a>
                <a href={'https://github.com/birdflop/web'} draggable={false}>
                  <Github size={24} />
                  Github
                </a>
                <a href={'https://discord.gg/nmgtX5z'} draggable={false}>
                  <LogoDiscord size={24} />
                  Discord
                </a>
              </div>
            </div>
            <div class="lum-card lum-bg-gray-800/30 relative min-w-76 max-w-76">
              <Blobs color='orange' class={{ 'absolute overflow-clip rounded-lg -z-10': true }} style={{ transform: 'translateZ(-10px)' }}/>
              <img src="https://www.burgersonfleek.ca/branding/icon.svg" height={200} width={200} class="mx-auto mb-5" />
              <h3 class="text-gray-100 text-xl font-bold">
                Burgers on Fleek
              </h3>
              <div class="flex gap-2 items-center flex-wrap">
                <QwikTag />
              </div>
              <p class="text-gray-400 text-sm">
                The burgers you are craving.™ Premium Quality Gourmet Burgers, Steak Sandwiches, Fries, and more. est. 2019
              </p>
              <div class={{
                'lum-card lum-bg-gray-900/50 absolute inset-0 !p-2 !gap-2 !border-0 !text-white w-full h-full z-10 backdrop-blur-xl transition duration-300 hover:duration-75 ease-out opacity-0 hover:opacity-100': true,
                '[&>*]:h-full [&>*]:w-full [&>*]:lum-btn [&>*]:rounded-lum-2 [&>*]:lum-bg-transparent [&>*]:hover:lum-bg-orange-900/20 [&>*]:flex [&>*]:flex-col [&>*]:justify-center [&>*]:transition-all [&>*]:items-center [&>*]:gap-2': true,
              }}>
                <a href={'https://burgersonfleek.ca'} draggable={false}>
                  <Globe size={24} />
                  Visit page
                </a>
                <a href={'https://github.com/saboooor/burgersonfleek'} draggable={false}>
                  <Github size={24} />
                  Github
                </a>
              </div>
            </div>
            <div class="lum-card lum-bg-gray-800/30 relative min-w-76 max-w-76">
              <Blobs color='pink' class={{ 'absolute overflow-clip rounded-lg -z-10': true }} style={{ transform: 'translateZ(-10px)' }}/>
              <div class="flex items-center text-[#f0ccfb] fill-[#f0ccfb] text-6xl" style="filter: drop-shadow(0 0 2rem #CB6CE6);">
                <LogoLuminescent size={150} class="my-8.5" /> ui
              </div>
              <h3 class="text-gray-100 text-xl font-bold">
                Luminescent / ui
              </h3>
              <div class="flex gap-2 items-center flex-wrap">
                <QwikTag /><ReactTag />
              </div>
              <p class="text-gray-400 text-sm">
                A component library for Qwik and React built with Tailwind CSS
              </p>
              <div class={{
                'lum-card lum-bg-gray-900/50 absolute inset-0 !p-2 !gap-2 !border-0 !text-white w-full h-full z-10 backdrop-blur-xl transition duration-300 hover:duration-75 ease-out opacity-0 hover:opacity-100': true,
                '[&>*]:h-full [&>*]:w-full [&>*]:lum-btn [&>*]:rounded-lum-2 [&>*]:lum-bg-transparent [&>*]:hover:lum-bg-pink-900/20 [&>*]:flex [&>*]:flex-col [&>*]:justify-center [&>*]:transition-all [&>*]:items-center [&>*]:gap-2': true,
              }}>
                <a href={'https://ui.luminescent.dev'} draggable={false}>
                  <Globe size={24} />
                  Visit page
                </a>
                <a href={'https://github.com/LuminescentDev/ui'} draggable={false}>
                  <Github size={24} />
                  Github
                </a>
              </div>
            </div>
            <div class="lum-card lum-bg-gray-800/30 relative min-w-76 max-w-76">
              {/* eslint-disable-next-line qwik/jsx-img */}
              <img src="/mineplace.svg" alt="Mineplace Logo" width={200} height={200} class="mx-auto mb-5" />
              <h3 class="text-gray-100 text-xl font-bold">
                Mineplace
              </h3>
              <div class="flex gap-2 items-center flex-wrap">
                <QwikTag /><MCTag />
              </div>
              <p class="text-gray-400 text-sm">
                A 3d version of r/place in Minecraft, powered by Birdflop Hosting.
              </p>
              <Blobs color='orange' class={{ 'absolute overflow-clip rounded-lg -z-10': true }} style={{ transform: 'translateZ(-10px)' }}/>
              <div class={{
                'lum-card lum-bg-gray-900/50 absolute inset-0 !p-2 !gap-2 !border-0 !text-white w-full h-full z-10 backdrop-blur-xl transition duration-300 hover:duration-75 ease-out opacity-0 hover:opacity-100': true,
                '[&>*]:h-full [&>*]:w-full [&>*]:lum-btn [&>*]:rounded-lum-2 [&>*]:lum-bg-transparent [&>*]:hover:lum-bg-cyan-900/20 [&>*]:flex [&>*]:flex-col [&>*]:justify-center [&>*]:transition-all [&>*]:items-center [&>*]:gap-2': true,
              }}>
                <a href={'https://mineplace.me'} draggable={false}>
                  <Globe size={24} />
                  Visit page
                </a>
                <a href={'https://github.com/LuminescentDev/mineplace'} draggable={false}>
                  <Github size={24} />
                  Github
                </a>
                <a href={'https://discord.gg/qNj5kMwE'} draggable={false}>
                  <LogoDiscord size={24} />
                  Discord
                </a>
              </div>
            </div>
            <div class="lum-card lum-bg-gray-800/30 relative min-w-76 max-w-76">
              <Blobs color='pink' class={{ 'absolute overflow-clip rounded-lg -z-10': true }} style={{ transform: 'translateZ(-10px)' }}/>
              <Luminara class="mx-auto mb-5 w-50" />
              <h3 class="text-gray-100 text-xl font-bold">
                Luminara
              </h3>
              <div class="flex gap-2 items-center flex-wrap">
                <QwikTag /><MCTag />
              </div>
              <p class="text-gray-400 text-sm">
                A Friendly Semi-Vanilla Minecraft Server also known as Nether Depths!
              </p>
              <div class={{
                'lum-card lum-bg-gray-900/50 absolute inset-0 !p-2 !gap-2 !border-0 !text-white w-full h-full z-10 backdrop-blur-xl transition duration-300 hover:duration-75 ease-out opacity-0 hover:opacity-100': true,
                '[&>*]:h-full [&>*]:w-full [&>*]:lum-btn [&>*]:rounded-lum-2 [&>*]:lum-bg-transparent [&>*]:hover:lum-bg-pink-900/20 [&>*]:flex [&>*]:flex-col [&>*]:justify-center [&>*]:transition-all [&>*]:items-center [&>*]:gap-2': true,
              }}>
                <a href={'https://luminaramc.org'} draggable={false}>
                  <Globe size={24} />
                  Visit page
                </a>
                <a href={'https://discord.gg/Mw7fNpdg5N'} draggable={false}>
                  <LogoDiscord size={24} />
                  Discord
                </a>
              </div>
            </div>
            <div class="lum-card lum-bg-gray-800/30 relative min-w-76 max-w-76">
              <LogoBirdflop size={200} class="mx-auto mb-5" fillGradient={['#54daf4', '#545eb6']}/>
              <h3 class="text-gray-100 text-xl font-bold">
                Botflop
              </h3>
              <div class="flex gap-2 items-center flex-wrap">
                <MCTag />
              </div>
              <p class="text-gray-400 text-sm">
                A Discord bot originally written in Python ported to JavaScript with 300,000+ users that analyzes timings delay reports to suggest mitigations for common Minecraft server issues.
              </p>
              <Blobs color='cyan' class={{ 'absolute overflow-clip rounded-lg -z-10': true }} style={{ transform: 'translateZ(-10px)' }}/>
              <div class={{
                'lum-card lum-bg-gray-900/50 absolute inset-0 !p-2 !gap-2 !border-0 !text-white w-full h-full z-10 backdrop-blur-xl transition duration-300 hover:duration-75 ease-out opacity-0 hover:opacity-100': true,
                '[&>*]:h-full [&>*]:w-full [&>*]:lum-btn [&>*]:rounded-lum-2 [&>*]:lum-bg-transparent [&>*]:hover:lum-bg-cyan-900/20 [&>*]:flex [&>*]:flex-col [&>*]:justify-center [&>*]:transition-all [&>*]:items-center [&>*]:gap-2': true,
              }}>
                <a href={'https://github.com/birdflop/botflop'} draggable={false}>
                  <Github size={24} />
                  Github
                </a>
                <a href={'https://discord.gg/nmgtX5z'} draggable={false}>
                  <LogoDiscord size={24} />
                  Discord
                </a>
              </div>
            </div>
            <div class="lum-card lum-bg-gray-800/30 relative min-w-76 max-w-76">
              <Blobs color='orange' class={{ 'absolute overflow-clip rounded-lg -z-10': true }} style={{ transform: 'translateZ(-10px)' }}/>
              <Cactie class="mx-auto mb-5 w-50" />
              <h3 class="text-gray-100 text-xl font-bold">
                Cactie
              </h3>
              <div class="flex gap-2 items-center flex-wrap">
                <QwikTag />
              </div>
              <p class="text-gray-400 text-sm">
                The last Discord bot you need, Cactie. Moderation, Fun, QOL, Utilities, and More!
              </p>
              <div class={{
                'lum-card lum-bg-gray-900/50 absolute inset-0 !p-2 !gap-2 !border-0 !text-white w-full h-full z-10 backdrop-blur-xl transition duration-300 hover:duration-75 ease-out opacity-0 hover:opacity-100': true,
                '[&>*]:h-full [&>*]:w-full [&>*]:lum-btn [&>*]:rounded-lum-2 [&>*]:lum-bg-transparent [&>*]:hover:lum-bg-cyan-900/20 [&>*]:flex [&>*]:flex-col [&>*]:justify-center [&>*]:transition-all [&>*]:items-center [&>*]:gap-2': true,
              }}>
                <a href={'https://cactie.luminescent.dev'} draggable={false}>
                  <Globe size={24} />
                  Visit page
                </a>
                <a href={'https://github.com/saboooor/Cactie'} draggable={false}>
                  <Github size={24} />
                  Github
                </a>
                <a href={'/discord'} draggable={false}>
                  <LogoDiscord size={24} />
                  Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});