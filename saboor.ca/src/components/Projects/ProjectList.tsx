import { component$, JSX } from '@qwik.dev/core';
import { MCTag, QwikTag, ReactTag } from './Tags';
import { Component } from '@qwik.dev/core';

import { Birdflop, Luminescent } from '@luminescent/icons-qwik';
import { IconProps, SiDiscord, SiGithub } from 'simple-icons-qwik';
import { Globe } from 'lucide-icons-qwik';
import Luminara from '~/components/images/Luminara.png?jsx';
import Cactie from '~/components/images/Cactie.png?jsx';
export const LuminaraIcon = component$(() => {
  return <Luminara class="mx-auto mb-5 w-25 h-25 md:w-50 md:h-50" />;
});
export const CactieIcon = component$(() => {
  return <Cactie class="mx-auto mb-5 w-25 h-25 md:w-50 md:h-50" />;
});
export const LuminescentUIIcon = component$(() => {
  return <span class="flex items-center justify-center text-[#f0ccfb] fill-[#f0ccfb] text-3xl md:text-5xl" style="filter: drop-shadow(0 0 2rem #CB6CE6);">
    <Luminescent size={150} class="my-5.5 md:my-12.5 w-19 h-19 md:w-30 md:h-30" />/ ui
  </span>;
});

export type Project = {
  title: string;
  description: string;
  image: JSX.Element;
  tags: Component[];
  color: string;
  btnClass: string;
  buttons: Button[]
}

type Button = {
  icon: Component<IconProps>;
  title: string;
  href: string;
}

export const Projects: Project[] = [
  {
    title: 'Birdflop',
    description: 'A registered 501(c)(3) nonprofit server host aiming to provide affordable and accessible hosting and resources.',
    image: <Birdflop size={200} class="mx-auto mb-5 w-25 h-25 md:w-50 md:h-50" fillGradient={['#54daf4', '#545eb6']}/>,
    tags: [QwikTag, ReactTag, MCTag],
    color: 'lum-bg-cyan-500',
    btnClass: 'hover:lum-bg-cyan-500/20',
    buttons: [
      {
        icon: Globe,
        title: 'Visit page',
        href: 'https://birdflop.com',
      },
      {
        icon: SiGithub,
        title: 'Github',
        href: 'https://github.com/birdflop/web',
      },
      {
        icon: SiDiscord,
        title: 'Discord',
        href: 'https://discord.gg/nmgtX5z',
      },
    ],
  },
  {
    title: 'Burgers on Fleek',
    description: 'The burgers you are craving.™ Premium Quality Gourmet Burgers, Steak Sandwiches, Fries, and more. est. 2019.',
    image: '/burgersonfleek.svg',
    tags: [QwikTag],
    color: 'lum-bg-orange-500',
    btnClass: 'hover:lum-bg-orange-500/20',
    buttons: [
      {
        icon: Globe,
        title: 'Visit page',
        href: 'https://burgersonfleek.ca',
      },
      {
        icon: SiGithub,
        title: 'Github',
        href: 'https://github.com/saboooor/burgersonfleek',
      },
    ],
  },
  {
    title: 'Luminescent / ui',
    description: 'A component library for Qwik and React built with Tailwind CSS.',
    image: <LuminescentUIIcon />,
    tags: [QwikTag, ReactTag],
    color: 'lum-bg-pink-500',
    btnClass: 'hover:lum-bg-pink-500/20',
    buttons: [
      {
        icon: Globe,
        title: 'Visit page',
        href: 'https://ui.luminescent.dev',
      },
      {
        icon: SiGithub,
        title: 'Github',
        href: 'https://github.com/LuminescentDev/ui',
      },
    ],
  },
  {
    title: 'Mineplace',
    description: 'A 3d version of r/place in Minecraft, powered by Birdflop Hosting.',
    image: '/mineplace.svg',
    tags: [QwikTag, MCTag],
    color: 'lum-bg-orange-500',
    btnClass: 'hover:lum-bg-orange-500/20',
    buttons: [
      {
        icon: Globe,
        title: 'Visit page',
        href: 'https://mineplace.me',
      },
      {
        icon: SiGithub,
        title: 'Github',
        href: 'https://github.com/LuminescentDev/mineplace',
      },
      {
        icon: SiDiscord,
        title: 'Discord',
        href: 'https://discord.gg/qNj5kMwE',
      },
    ],
  },
  {
    title: 'Luminara',
    description: 'A Friendly Semi-Vanilla Minecraft Server also known as Nether Depths!',
    image: <LuminaraIcon />,
    tags: [QwikTag, MCTag],
    color: 'lum-bg-pink-500',
    btnClass: 'hover:lum-bg-pink-500/20',
    buttons: [
      {
        icon: Globe,
        title: 'Visit page',
        href: 'https://luminaramc.org',
      },
      {
        icon: SiGithub,
        title: 'Github',
        href: 'https://github.com/saboooor/Luminara',
      },
      {
        icon: SiDiscord,
        title: 'Discord',
        href: 'https://discord.gg/Mw7fNpdg5N',
      },
    ],
  },
  {
    title: 'Botflop',
    description: 'A Discord bot originally written in Python ported to JavaScript with 300,000+ users that analyzes timings delay reports to suggest mitigations for common Minecraft server issues.',
    image: <Birdflop size={200} class="mx-auto mb-5 w-25 h-25 md:w-50 md:h-50" fillGradient={['#54daf4', '#545eb6']}/>,
    tags: [MCTag],
    color: 'lum-bg-cyan-500',
    btnClass: 'hover:lum-bg-cyan-500/20',
    buttons: [
      {
        icon: SiGithub,
        title: 'Github',
        href: 'https://github.com/birdflop/botflop',
      },
      {
        icon: SiDiscord,
        title: 'Discord',
        href: 'https://discord.gg/nmgtX5z',
      },
    ],
  },
  {
    title: 'Cactie',
    description: 'The last Discord bot you need, Cactie. Moderation, Fun, QOL, Utilities, and More!',
    image: <CactieIcon />,
    tags: [QwikTag],
    color: 'lum-bg-green-500',
    btnClass: 'hover:lum-bg-green-500/20',
    buttons: [
      {
        icon: Globe,
        title: 'Visit page',
        href: 'https://cactie.luminescent.dev',
      },
      {
        icon: SiGithub,
        title: 'Github',
        href: 'https://github.com/saboooor/Cactie',
      },
      {
        icon: SiDiscord,
        title: 'Discord',
        href: '/discord',
      },
    ],
  },
];