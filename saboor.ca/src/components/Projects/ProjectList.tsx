import { component$, JSX } from '@qwik.dev/core';
import { MCTag, QwikTag, ReactTag, PythonTag } from './Tags';
import { Component } from '@qwik.dev/core';

import { Birdflop, Luminescent } from '@luminescent/icons-qwik';
import { IconProps, SiDiscord, SiGithub } from 'simple-icons-qwik';
import { Globe } from 'lucide-icons-qwik';
import Luminara from '~/components/images/projects/Luminara.png?jsx';
import Cactie from '~/components/images/projects/Cactie.png?jsx';
export const LuminaraIcon = component$(() => {
  return <Luminara class="w-6 h-6 md:min-w-12 md:min-h-12" />;
});
export const CactieIcon = component$(() => {
  return <Cactie class="w-6 h-6 md:min-w-12 md:min-h-12" />;
});
export const LuminescentUIIcon = component$(() => {
  return <Luminescent size={48} class="w-6 h-6 md:min-w-12 md:min-h-12" />;
});

export type Project = {
  title: string;
  description: string;
  image: JSX.Element;
  showcase?: string;
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
    image: <Birdflop size={48} class="w-6 h-6 md:min-w-12 md:min-h-12" fillGradient={['#54daf4', '#545eb6']}/>,
    showcase: 'birdflop_com.jpeg',
    tags: [QwikTag, MCTag],
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
    title: '3Compute',
    description: 'A free educational platform that provides cloud-based development environments for learning and building projects.',
    image: <Birdflop size={48} class="w-6 h-6 md:min-w-12 md:min-h-12" fillGradient={['#54daf4', '#545eb6']}/>,
    showcase: '3compute_org.jpeg',
    tags: [ReactTag, PythonTag],
    color: 'lum-bg-cyan-500',
    btnClass: 'hover:lum-bg-cyan-500/20',
    buttons: [
      {
        icon: Globe,
        title: 'Visit page',
        href: 'https://3compute.org',
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
    showcase: 'burgersonfleek_ca.jpeg',
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
    showcase: 'ui_luminescent_dev.jpeg',
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
    showcase: 'luminaramc_org.jpeg',
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
    image: <Birdflop size={48} class="w-6 h-6 md:w-12 md:h-12" fillGradient={['#54daf4', '#545eb6']}/>,
    tags: [MCTag, PythonTag],
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
    showcase: 'cactie_luminescent_dev.jpeg',
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