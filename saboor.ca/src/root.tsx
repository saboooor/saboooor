import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/Head';

import './global.css';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const nekoEl = document.createElement('div');

    let nekoPosX = 32;
    let nekoPosY = 32;

    let mousePosX = 0;
    let mousePosY = 0;

    let frameCount = 0;
    let idleTime = 0;
    type idleAnimations = 'sleeping' | 'scratchWallN' | 'scratchWallS' | 'scratchWallE' | 'scratchWallW' | 'scratchSelf';
    let idleAnimation: idleAnimations | null = null;
    let idleAnimationFrame = 0;

    let nekoSpeed = 10;
    let distance = 10;
    const spriteSets = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [
        [-5, 0],
        [-6, 0],
        [-7, 0],
      ],
      scratchWallN: [
        [0, 0],
        [0, -1],
      ],
      scratchWallS: [
        [-7, -1],
        [-6, -2],
      ],
      scratchWallE: [
        [-2, -2],
        [-2, -3],
      ],
      scratchWallW: [
        [-4, 0],
        [-4, -1],
      ],
      tired: [[-3, -2]],
      sleeping: [
        [-2, 0],
        [-2, -1],
      ],
      N: [
        [-1, -2],
        [-1, -3],
      ],
      NE: [
        [0, -2],
        [0, -3],
      ],
      E: [
        [-3, 0],
        [-3, -1],
      ],
      SE: [
        [-5, -1],
        [-5, -2],
      ],
      S: [
        [-6, -3],
        [-7, -2],
      ],
      SW: [
        [-5, -3],
        [-6, -1],
      ],
      W: [
        [-4, -2],
        [-4, -3],
      ],
      NW: [
        [-1, 0],
        [-1, -1],
      ],
    };

    function init() {
      nekoEl.id = 'oneko';
      nekoEl.ariaHidden = 'true';
      nekoEl.style.width = '32px';
      nekoEl.style.height = '32px';
      nekoEl.style.position = 'fixed';
      nekoEl.style.pointerEvents = 'none';
      nekoEl.style.backgroundImage = 'url(\'./oneko.gif\')';
      nekoEl.style.imageRendering = 'pixelated';
      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
      nekoEl.style.zIndex = '100';

      document.body.appendChild(nekoEl);

      document.addEventListener('mousemove', function (event) {
        mousePosX = event.clientX;
        mousePosY = event.clientY;
      });

      window.requestAnimationFrame(onAnimatonFrame);
    }

    let lastFrameTimestamp: number;

    function onAnimatonFrame(timestamp: number) {
      // Stops execution if the neko element is removed from DOM
      if (!nekoEl.isConnected) return;
      if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;
      if (timestamp - lastFrameTimestamp > 80) {
        lastFrameTimestamp = timestamp;
        frame();
      }
      window.requestAnimationFrame(onAnimatonFrame);
    }

    function setSprite(name: keyof typeof spriteSets, frame: number) {
      const sprite = spriteSets[name][frame % spriteSets[name].length];
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }

    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }

    function idle() {
      idleTime += 1;

      // every ~ 20 seconds
      if (
        idleTime > 10 &&
        Math.floor(Math.random() * 200) == 0 &&
        idleAnimation == null
      ) {
        const avalibleIdleAnimations: idleAnimations[] = ['sleeping', 'scratchSelf'];
        if (nekoPosX < 32) avalibleIdleAnimations.push('scratchWallW');
        if (nekoPosY < 32) avalibleIdleAnimations.push('scratchWallN');
        if (nekoPosX > window.innerWidth - 32) avalibleIdleAnimations.push('scratchWallE');
        if (nekoPosY > window.innerHeight - 32) avalibleIdleAnimations.push('scratchWallS');
        idleAnimation = avalibleIdleAnimations[Math.floor(Math.random() * avalibleIdleAnimations.length)];
      }

      switch (idleAnimation) {
      case 'sleeping':
        if (idleAnimationFrame < 8) {
          setSprite('tired', 0);
          break;
        }
        setSprite('sleeping', Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192) {
          resetIdleAnimation();
        }
        break;
      case 'scratchWallN':
      case 'scratchWallS':
      case 'scratchWallE':
      case 'scratchWallW':
      case 'scratchSelf':
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite('idle', 0);
        return;
      }
      idleAnimationFrame += 1;
    }

    function frame() {
      frameCount += 1;
      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      distance = Math.sqrt(diffX ** 2 + diffY ** 2);
      nekoSpeed = distance / 10 > 5 ? distance / 10 : distance / 5;

      if (distance < 10) {
        idle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setSprite('alert', 0);
        // count down after being alerted before moving
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }

      let direction = '';
      const yDistance = diffY / distance;
      const xDistance = diffX / distance;
      direction += yDistance > 0.5 ? 'N' : yDistance < -0.5 ? 'S' : '';
      direction += xDistance > 0.5 ? 'W' : xDistance < -0.5 ? 'E' : '';
      setSprite(direction as 'N' | 'S' | 'W' | 'E' | 'NE' | 'SE' | 'SW' | 'NW', frameCount);

      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;

      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    }

    init();
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <script defer src="https://umami.bwmp.dev/script.js" data-website-id="f26ebf9b-d9c4-42ee-aeb8-76458504a10e"/>
        <RouterHead />
      </head>
      <body class="text-gray-200">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
