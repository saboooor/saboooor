import { JSX } from '@builder.io/qwik/jsx-runtime';
import { LogoBirdflop, LogoDiscord, LogoLuminescent } from '@luminescent/ui-qwik';
import { MCTag, QwikTag, ReactTag, PythonTag } from './Tags';
import { Component } from '@builder.io/qwik';
import { Github, Globe } from 'lucide-icons-qwik';
const Mineplace = '/mineplace.svg';
import Cactie from '~/components/images/projects/Cactie.png?jsx';
import Luminara from '~/components/images/projects/Luminara.png?jsx';

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
  icon: JSX.Element;
  title: string;
  href: string;
}

export const Projects: Project[] = [
  {
    title: 'Birdflop',
    description: 'A registered 501(c)(3) nonprofit server host aiming to provide affordable and accessible hosting and resources.',
    image: <LogoBirdflop size={48} class="w-6 h-6 md:min-w-12 md:min-h-12" fillGradient={['#54daf4', '#545eb6']}/>,
    showcase: 'birdflop_com.jpeg',
    tags: [QwikTag, MCTag],
    color: 'lum-bg-cyan-500',
    btnClass: 'hover:lum-bg-cyan-500/20',
    buttons: [
      {
        icon: <Globe size={24} />,
        title: 'Visit page',
        href: 'https://birdflop.com',
      },
      {
        icon: <Github size={24} />,
        title: 'Github',
        href: 'https://github.com/birdflop/web',
      },
      {
        icon: <LogoDiscord size={24} />,
        title: 'Discord',
        href: 'https://discord.gg/nmgtX5z',
      },
    ],
  },
  {
    title: '3Compute',
    description: 'A free educational platform that provides cloud-based development environments for learning and building projects.',
    image: <LogoBirdflop size={48} class="w-6 h-6 md:min-w-12 md:min-h-12" fillGradient={['#54daf4', '#545eb6']}/>,
    showcase: '3compute_org.jpeg',
    tags: [ReactTag, PythonTag],
    color: 'lum-bg-cyan-500',
    btnClass: 'hover:lum-bg-cyan-500/20',
    buttons: [
      {
        icon: <Globe size={24} />,
        title: 'Visit page',
        href: 'https://3compute.org',
      },
      {
        icon: <LogoDiscord size={24} />,
        title: 'Discord',
        href: 'https://discord.gg/nmgtX5z',
      },
    ],
  },
  {
    title: 'Burgers on Fleek',
    description: 'The burgers you are craving.™ Premium Quality Gourmet Burgers, Steak Sandwiches, Fries, and more. est. 2019.',
    image: <img src="https://www.burgersonfleek.ca/branding/svg/icon.svg" height={48} width={48} class="w-6 h-6 md:w-12 md:h-12" />,
    showcase: 'burgersonfleek_ca.jpeg',
    tags: [QwikTag],
    color: 'lum-bg-orange-500',
    btnClass: 'hover:lum-bg-orange-500/20',
    buttons: [
      {
        icon: <Globe size={24} />,
        title: 'Visit page',
        href: 'https://burgersonfleek.ca',
      },
      {
        icon: <Github size={24} />,
        title: 'Github',
        href: 'https://github.com/saboooor/burgersonfleek',
      },
    ],
  },
  {
    title: 'Luminescent / ui',
    description: 'A component library for Qwik and React built with Tailwind CSS.',
    image: <LogoLuminescent size={48} class="w-6 h-6 md:w-12 md:h-12 fill-[#f0ccfb]" />,
    showcase: 'ui_luminescent_dev.jpeg',
    tags: [QwikTag, ReactTag],
    color: 'lum-bg-pink-500',
    btnClass: 'hover:lum-bg-pink-500/20',
    buttons: [
      {
        icon: <Globe size={24} />,
        title: 'Visit page',
        href: 'https://ui.luminescent.dev',
      },
      {
        icon: <Github size={24} />,
        title: 'Github',
        href: 'https://github.com/LuminescentDev/ui',
      },
    ],
  },
  {
    title: 'Mineplace',
    description: 'A 3d version of r/place in Minecraft, powered by Birdflop Hosting.',
    image: <img src={Mineplace} alt="Mineplace Logo" width={48} height={48} class="w-6 h-6 md:w-12 md:h-12" />,
    tags: [QwikTag, MCTag],
    color: 'lum-bg-orange-500',
    btnClass: 'hover:lum-bg-orange-500/20',
    buttons: [
      {
        icon: <Globe size={24} />,
        title: 'Visit page',
        href: 'https://mineplace.me',
      },
      {
        icon: <Github size={24} />,
        title: 'Github',
        href: 'https://github.com/LuminescentDev/mineplace',
      },
      {
        icon: <LogoDiscord size={24} />,
        title: 'Discord',
        href: 'https://discord.gg/qNj5kMwE',
      },
    ],
  },
  {
    title: 'Luminara',
    description: 'A Friendly Semi-Vanilla Minecraft Server also known as Nether Depths!',
    image: <Luminara class="w-6 h-6 md:w-12 md:h-12" />,
    showcase: 'luminaramc_org.jpeg',
    tags: [QwikTag, MCTag],
    color: 'lum-bg-pink-500',
    btnClass: 'hover:lum-bg-pink-500/20',
    buttons: [
      {
        icon: <Globe size={24} />,
        title: 'Visit page',
        href: 'https://luminaramc.org',
      },
      {
        icon: <Github size={24} />,
        title: 'Github',
        href: 'https://github.com/saboooor/Luminara',
      },
      {
        icon: <LogoDiscord size={24} />,
        title: 'Discord',
        href: 'https://discord.gg/Mw7fNpdg5N',
      },
    ],
  },
  {
    title: 'Botflop',
    description: 'A Discord bot originally written in Python ported to JavaScript with 300,000+ users that analyzes timings delay reports to suggest mitigations for common Minecraft server issues.',
    image: <LogoBirdflop size={48} class="w-6 h-6 md:w-12 md:h-12" fillGradient={['#54daf4', '#545eb6']}/>,
    tags: [MCTag, PythonTag],
    color: 'lum-bg-cyan-500',
    btnClass: 'hover:lum-bg-cyan-500/20',
    buttons: [
      {
        icon: <Github size={24} />,
        title: 'Github',
        href: 'https://github.com/birdflop/botflop',
      },
      {
        icon: <LogoDiscord size={24} />,
        title: 'Discord',
        href: 'https://discord.gg/nmgtX5z',
      },
    ],
  },
  {
    title: 'Cactie',
    description: 'The last Discord bot you need, Cactie. Moderation, Fun, QOL, Utilities, and More!',
    image: <Cactie class="w-6 h-6 md:w-12 md:h-12" />,
    showcase: 'cactie_luminescent_dev.jpeg',
    tags: [QwikTag],
    color: 'lum-bg-green-500',
    btnClass: 'hover:lum-bg-green-500/20',
    buttons: [
      {
        icon: <Globe size={24} />,
        title: 'Visit page',
        href: 'https://cactie.luminescent.dev',
      },
      {
        icon: <Github size={24} />,
        title: 'Github',
        href: 'https://github.com/saboooor/Cactie',
      },
      {
        icon: <LogoDiscord size={24} />,
        title: 'Discord',
        href: '/discord',
      },
    ],
  },
];