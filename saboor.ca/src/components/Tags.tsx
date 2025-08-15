import { component$ } from '@builder.io/qwik';

export const QwikTag = component$(() => {
  return (
    <p class="lum-btn lum-bg-purple-800/50 rounded-lum text-xs gap-1.5 font-semibold p-1 pr-2">
      {/* eslint-disable-next-line qwik/jsx-img */}
      <img src="/qwik.svg" alt="Qwik Logo" width={16} height={16} />
      Qwik
    </p>
  );
});
export const ReactTag = component$(() => {
  return (
    <p class="lum-btn lum-bg-blue-800/50 rounded-lum text-xs gap-1.5 font-semibold p-1 pr-2">
      {/* eslint-disable-next-line qwik/jsx-img */}
      <img src="/react.svg" alt="React Logo" width={16} height={16} />
      React
    </p>
  );
});
export const MCTag = component$(() => {
  return (
    <p class="lum-btn lum-bg-green-800/50 rounded-lum text-xs gap-1.5 font-semibold p-1 pr-2">
      {/* eslint-disable-next-line qwik/jsx-img */}
      <img src="/minecraft.avif" alt="Minecraft Logo" width={16} height={16} class="rounded-lum-1" />
      Minecraft
    </p>
  );
});