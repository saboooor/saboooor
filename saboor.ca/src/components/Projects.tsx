import { component$, useVisibleTask$ } from '@builder.io/qwik';

import { Blobs } from '@luminescent/ui-qwik';
import { ChevronLeft, ChevronRight } from 'lucide-icons-qwik';

import { Projects } from './ProjectList';

export default component$(() => {
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const container = document.getElementById('content-container')!;
    const offsetChild = document.getElementById('offset')!;
    const scrollLeft = document.getElementById('scroll-left')!;
    const scrollRight = document.getElementById('scroll-right')!;

    const padding = 10; // Padding to add to the offset

    let hovering = false;
    let scrollMultiplier = 1;

    let translateX = 0;
    const duration = 500;

    function scrollFn() {
      if (hovering) return;
      translateX += 60 * scrollMultiplier; // Adjust speed as needed
      container.style.transform = `translateX(-${translateX}px)`;
      // append the first child to the end of the container when it moves out of view
      for (let i = 0; i < scrollMultiplier; i++) {
        const secondChild = container.children[1] as HTMLElement;
        const offset = (secondChild?.clientWidth * 2) + offsetChild.clientWidth + padding;
        const offsetWidth = secondChild?.clientWidth + offsetChild.clientWidth + padding;
        if (translateX > offset) {
          container.appendChild(secondChild);
          // add width of second child to offset
          offsetChild.style.width = `${offsetWidth}px`;
        }
      }
    }

    // Automatically scroll without user interaction, append each child when it moves out of the container for infinite scrolling
    const scrollInterval = setInterval(scrollFn, duration / scrollMultiplier);

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
    <section id="projects" class="flex flex-col mx-auto max-w-7xl items-center pt-40">
      <div class="text-center">
        <h2 class="text-gray-100 text-3xl font-bold mb-2">
          My Projects
        </h2>
        <p class="text-gray-400">
          Here are some of the projects I'm working on<br/>
          Hover over them to see more info<br/>
        </p>
      </div>

      <div class="flex relative w-full my-10 px-8">
        {/* Speed buttons - allows for clicking anywhere but with a moderately sized visual button */}
        <button class="absolute left-0 lum-bg-transparent z-10 h-full focus:border-none" id="scroll-left">
          <div class="lum-btn p-2 pl-1 py-5 backdrop-blur-sm lum-bg-gray-900 group-hover:lum-bg-gray-800 drop-shadow-2xl rounded-lum-1">
            <ChevronLeft size={48}/>
          </div>
        </button>
        <button class="absolute right-0 lum-bg-transparent z-10 h-full focus:border-none" id="scroll-right">
          <div class="lum-btn p-2 pr-1 py-5 backdrop-blur-sm lum-bg-gray-900 group-hover:lum-bg-gray-800 drop-shadow-2xl">
            <ChevronRight size={48}/>
          </div>
        </button>

        {/* Fade masks */}
        <div class="absolute left-8 border border-r-0 rounded-r-none border-l-gray-800 border-y-gray-800 bg-gradient-to-r from-gray-950 to-transparent h-full w-20 z-5 rounded-lum pointer-events-none"/>
        <div class="absolute right-8 border border-l-0 rounded-l-none border-r-gray-800 border-y-gray-800 bg-gradient-to-l from-gray-950 to-transparent h-full w-20 z-5 rounded-lum pointer-events-none"/>

        {/* Background - Can not put background on overflow container because of border rounding */}
        <div class="absolute inset-0 rounded-lum lum-bg-gray-950 border-gray-800 mx-8"/>

        <div class="flex relative w-full overflow-x-hidden p-10">
          <div id="content-container" class="flex gap-2 py-2 select-none transition-transform duration-500 ease-linear">
            {/* Offset that adds space before the card gets moved to the end */}
            <div id="offset"/>

            {Projects.map((project) => (
              <div key={project.title} class="lum-card lum-bg-gray-900/50 relative min-w-48 max-w-48 md:min-w-64 md:max-w-64">
                {project.image}
                <h3 class="text-gray-100 text-base md:text-xl font-bold">
                  {project.title}
                </h3>
                <div class="hidden md:flex gap-2 items-center flex-wrap">
                  {project.tags.map((Tag, i) => (
                    <Tag key={i} />
                  ))}
                </div>
                <p class="text-gray-400 text-xs md:text-sm">
                  {project.description}
                </p>
                <Blobs color={[
                  project.color, project.color, project.color,
                ]} class={{ 'absolute overflow-clip rounded-lg -z-10': true }} style={{ transform: 'translateZ(-10px)' }}/>
                <div class={{
                  'group lum-card lum-bg-gray-900/30 absolute inset-0 p-2 gap-2 w-full h-full z-10 backdrop-blur-md transition duration-300 hover:duration-75 ease-out opacity-0 hover:opacity-100': true,
                }}>
                  {project.buttons.map((button, i) => (
                    <a key={i} href={button.href} draggable={false} class={{
                      'lum-btn pointer-events-none group-hover:pointer-events-auto h-full w-full rounded-lum-2 lum-bg-transparent flex flex-col justify-center transition-all items-center gap-2': true,
                      [project.btnClass]: project.btnClass,
                    }}>
                      {button.icon}
                      {button.title}
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <div class="border-l border-l-lum-border/20 ml-2 pr-2"/>

          </div>
        </div>
      </div>
    </section>
  );
});