import { JSX } from '@builder.io/qwik/jsx-runtime';
import { SiNodedotjs, SiReact, SiRust, SiTailwindcss, SiTypescript } from 'simple-icons-qwik';
const QwikIcon = '/qwik.svg';
const PythonIcon = '/python.svg';
const TauriIcon = '/tauri.svg';
const JavaIcon = '/java.svg';

export type Project = {
  title: string;
  href: string;
  experience: 1 | 2 | 3 | 4 | 5;
  description: string;
  image: JSX.Element;
  class: string;
}

export const Technologies: Project[] = [
  {
    title: 'Typescript',
    href: 'https://www.typescriptlang.org/',
    experience: 4,
    description: 'Javascript but with types',
    image: <SiTypescript size={56} class="fill-blue-500 min-w-14" />,
    class: 'lum-bg-blue-950/20 hover:lum-bg-blue-950',
  },
  {
    title: 'Qwik',
    href: 'https://qwik.dev/',
    experience: 4,
    description: 'An instantly-interactive web framework',
    image: <img src={QwikIcon} alt="Qwik Logo" width={56} height={56} />,
    class: 'lum-bg-purple-950/20 hover:lum-bg-purple-950',
  },
  {
    title: 'TailwindCSS',
    href: 'https://tailwindcss.com/',
    experience: 4,
    description: 'A utility-first CSS framework',
    image: <SiTailwindcss size={56} class="fill-cyan-500 min-w-14" />,
    class: 'lum-bg-cyan-950/20 hover:lum-bg-cyan-950',
  },
  {
    title: 'NodeJS',
    href: 'https://nodejs.org/',
    experience: 4,
    description: 'A backend Javascript runtime',
    image: <SiNodedotjs size={56} class="fill-green-500 min-w-14" />,
    class: 'lum-bg-green-950/20 hover:lum-bg-green-950',
  },
  {
    title: 'React',
    href: 'https://reactjs.org/',
    experience: 3,
    description: 'A Javascript web framework',
    image: <SiReact size={56} class="fill-blue-500 min-w-14" />,
    class: 'lum-bg-blue-950/20 hover:lum-bg-blue-950',
  },
  {
    title: 'Python',
    href: 'https://www.python.org/',
    experience: 2,
    description: 'A general-purpose programming language',
    image: <img src={PythonIcon} alt="Python Logo" width={56} height={56} />,
    class: 'lum-bg-yellow-950/20 hover:lum-bg-yellow-950',
  },
  {
    title: 'Tauri',
    href: 'https://tauri.app/',
    experience: 2,
    description: 'A framework for building tiny fast desktop applications',
    image: <img src={TauriIcon} alt="Tauri Logo" width={56} height={56} />,
    class: 'lum-bg-yellow-950/20 hover:lum-bg-yellow-950',
  },
  {
    title: 'Rust',
    href: 'https://www.rust-lang.org/',
    experience: 1,
    description: 'A low-level programming language',
    image: <SiRust size={56} class="fill-orange-500 min-w-14" />,
    class: 'lum-bg-orange-950/20 hover:lum-bg-orange-950',
  },
  {
    title: 'Java',
    href: 'https://www.java.com/',
    experience: 1,
    description: 'A language for building applications - such as Minecraft',
    image: <img src={JavaIcon} alt="Java Logo" width={56} height={56} />,
    class: 'lum-bg-cyan-950/20 hover:lum-bg-cyan-950',
  },
];