import { JSX } from '@builder.io/qwik/jsx-runtime';
import { Baby, Ellipsis } from 'lucide-icons-qwik';

export type TimelineItem = {
  title: string;
  description: string;
  image: JSX.Element;
  color: string;
  class?: string;
  buttons: Button[]
}

type Button = {
  icon: JSX.Element;
  title: string;
  href: string;
}

export const Timeline: {
  year: string;
  items: TimelineItem[];
}[] = [
  {
    year: '2017-2019',
    items: [
      {
        title: 'Start',
        description: 'I started my journey into programming and web development.',
        image: <Baby size={56} class="min-w-14"/>,
        color: 'lum-bg-cyan-500',
        buttons: [
          {
            icon: <Ellipsis size={24} />,
            title: 'Work in progress',
            href: 'https://birdflop.com',
          },
        ],
      },
    ],
  },
  {
    year: '2020',
    items: [
    ],
  },
  {
    year: '2021',
    items: [
    ],
  },
  {
    year: '2022',
    items: [
    ],
  },
  {
    year: '2023',
    items: [
    ],
  },
  {
    year: '2024',
    items: [
    ],
  },
  {
    year: '2025',
    items: [
    ],
  },
];