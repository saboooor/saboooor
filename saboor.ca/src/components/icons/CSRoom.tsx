import { component$ } from '@qwik.dev/core';

export default component$((props: any) =>
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'
    width={props.size} height={props.size}
  >
    <defs>
      <linearGradient id="csroom-fold" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#ebe4d2"></stop>
        <stop offset="1" stop-color="#fbecd0"></stop>
      </linearGradient>
    </defs>
    <g transform="translate(-4 -4) scale(0.8)">
      <path d="M6 4 Q4 4 4 6 L4 34 Q4 36 6 36 L26 36 L36 26 L36 6 Q36 4 34 4 Z" fill="#1f4e79"></path>
      <path d="M36 26 L26 26 Q26 36 26 36 Z" fill="url(#csroom-fold)"></path>
      <path d="M26 26 L36 26" stroke="#1f4e79" stroke-width="0.8" stroke-linecap="round" opacity="0.55"></path>
      <path d="M26 26 L26 36" stroke="#1f4e79" stroke-width="0.8" stroke-linecap="round" opacity="0.55"></path>
      <rect x="9" y="22" width="14" height="1.2" rx="0.6" fill="#e85d3f"></rect>
      <text x="9" y="20" font-family="Newsreader, Georgia, serif" font-weight="700" font-size="14" letter-spacing="-0.02em" fill="#fdfaf2">CS</text>
    </g>
  </svg>,
);