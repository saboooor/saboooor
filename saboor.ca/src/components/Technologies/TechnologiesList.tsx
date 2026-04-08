import { component$, JSXOutput } from '@qwik.dev/core';
import { SiNodedotjs, SiReact, SiRust, SiTailwindcss, SiTypescript } from 'simple-icons-qwik';
const QwikIcon = '/qwik.svg';
const PythonIcon = '/python.svg';
const TauriIcon = '/tauri.svg';
const JavaIcon = '/java.svg';

export type Project = {
  title: string;
  href: string;
  description: string;
  image: JSXOutput | string;
  // temp till simple icons supports classnames
  imageClass?: string;
  class: string;
  wip?: boolean;
}

const QwikLogo = component$(() => <img src={QwikIcon} alt="Qwik Logo" width={56} height={56} />);
const PythonLogo = component$(() => <img src={PythonIcon} alt="Python Logo" width={56} height={56} />);
const TauriLogo = component$(() => <img src={TauriIcon} alt="Tauri Logo" width={56} height={56} />);
const JavaLogo = component$(() => <img src={JavaIcon} alt="Java Logo" width={56} height={56} />);

export const Technologies: Project[] = [
  {
    title: 'Typescript',
    href: 'https://www.typescriptlang.org/',
    description: 'Javascript but with types',
    image: <SiTypescript size={56} class="fill-blue-500 min-w-14" />,
    imageClass: 'fill-blue-500 min-w-14',
    class: 'lum-grad-bg-blue-950/20 hover:lum-bg-blue-950',
  },
  {
    title: 'Qwik',
    href: 'https://qwik.dev/',
    description: 'An instantly-interactive web framework',
    image: <QwikLogo />,
    class: 'lum-grad-bg-purple-950/20 hover:lum-bg-purple-950',
  },
  {
    title: 'TailwindCSS',
    href: 'https://tailwindcss.com/',
    description: 'A utility-first CSS framework',
    image: <SiTailwindcss size={56} class="fill-cyan-500 min-w-14" />,
    imageClass: 'fill-cyan-500 min-w-14',
    class: 'lum-grad-bg-cyan-950/20 hover:lum-bg-cyan-950',
  },
  {
    title: 'NodeJS',
    href: 'https://nodejs.org/',
    description: 'A backend Javascript runtime',
    image: <SiNodedotjs size={56} class="fill-green-500 min-w-14" />,
    imageClass: 'fill-green-500 min-w-14',
    class: 'lum-grad-bg-green-950/20 hover:lum-bg-green-950',
  },
  {
    title: 'React',
    href: 'https://reactjs.org/',
    description: 'A Javascript web framework',
    image: <SiReact size={56} class="fill-blue-500 min-w-14" />,
    imageClass: 'fill-blue-500 min-w-14',
    class: 'lum-grad-bg-blue-950/20 hover:lum-bg-blue-950',
  },
  {
    title: 'Python',
    href: 'https://www.python.org/',
    description: 'A general-purpose programming language',
    image: <PythonLogo />,
    class: 'lum-grad-bg-yellow-950/20 hover:lum-bg-yellow-950',
  },
  {
    title: 'Tauri',
    href: 'https://tauri.app/',
    description: 'A framework for building tiny fast desktop applications',
    image: <TauriLogo />,
    class: 'lum-grad-bg-yellow-950/20 hover:lum-bg-yellow-950',
    wip: true,
  },
  {
    title: 'Rust',
    href: 'https://www.rust-lang.org/',
    description: 'A low-level programming language',
    image: <SiRust size={56} class="fill-orange-500 min-w-14" />,
    imageClass: 'fill-orange-500 min-w-14',
    class: 'lum-grad-bg-orange-950/20 hover:lum-bg-orange-950',
    wip: true,
  },
  {
    title: 'Java',
    href: 'https://www.java.com/',
    description: 'A language for building applications - such as Minecraft',
    image: <JavaLogo />,
    class: 'lum-grad-bg-cyan-950/20 hover:lum-bg-cyan-950',
    wip: true,
  },
];