import { component$ } from '@qwik.dev/core';
const Qwik = '/qwik.svg';
const React = '/react.svg';
const Python = '/python.svg';
const MC = '/minecraft.avif';

export const QwikTag = component$(() => {
  return (
    <p class="lum-btn lum-grad-bg-purple-800/50 rounded-lum gap-1.5 p-0.5 pr-1 text-xs font-semibold md:p-1 md:pr-2">
      <img src={Qwik} alt="Qwik Logo" width={16} height={16} />
      Qwik
    </p>
  );
});
export const ReactTag = component$(() => {
  return (
    <p class="lum-btn lum-grad-bg-blue-800/50 rounded-lum gap-1.5 p-0.5 pr-1 text-xs font-semibold md:p-1 md:pr-2">
      <img src={React} alt="React Logo" width={16} height={16} />
      React
    </p>
  );
});
export const PythonTag = component$(() => {
  return (
    <p class="lum-btn lum-grad-bg-yellow-800/50 rounded-lum gap-1.5 p-0.5 pr-1 text-xs font-semibold md:p-1 md:pr-2">
      <img src={Python} alt="Python Logo" width={16} height={16} />
      Python
    </p>
  );
});
export const MCTag = component$(() => {
  return (
    <p class="lum-btn lum-grad-bg-green-800/50 rounded-lum gap-1.5 p-0.5 pr-1 text-xs font-semibold md:p-1 md:pr-2">
      <img
        src={MC}
        alt="Minecraft Logo"
        width={16}
        height={16}
        class="rounded-lum-1"
      />
      Minecraft
    </p>
  );
});
