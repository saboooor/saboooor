import { component$ } from '@qwik.dev/core';
import { QwikRouterProvider, RouterOutlet, ServiceWorkerRegister } from '@qwik.dev/router';
import { RouterHead } from './components/Head';

import './global.css';

// i cba to detect whenever i have nitro or not
//const bgImg = 'https://dcdn.dstn.to/banners/249638347306303499?size=1280';

import BgImg from '~/components/images/bg.png?jsx';
export const Background = BgImg;

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikRouterProvider>
      <head>
        <meta charset="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <script defer src="https://umami.bwmp.dev/script.js" data-website-id="f26ebf9b-d9c4-42ee-aeb8-76458504a10e"/>
        <RouterHead />
      </head>
      <body class="text-gray-200">
        <Background
          width={1280} height={720}
          alt="Saboor's banner"
          class="fixed w-full -z-1 mask-b-from-0 blur-lg top-0 scale-120 opacity-20 overflow-clip" />
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikRouterProvider>
  );
});
