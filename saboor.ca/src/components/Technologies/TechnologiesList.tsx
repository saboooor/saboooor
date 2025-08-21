import { JSX } from '@builder.io/qwik/jsx-runtime';
import { SiTypescript } from 'simple-icons-qwik';

export type Project = {
  title: string;
  description: string;
  image: JSX.Element;
  class: string;
}

export const Technologies: Project[] = [
  {
    title: 'Typescript',
    description: 'Javascript but with types',
    image: <SiTypescript size={56} class="fill-blue-500" />,
    class: 'hover:lum-bg-cyan-500/20',
  },
];