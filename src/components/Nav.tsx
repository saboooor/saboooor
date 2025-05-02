// LuminescentDev Navbar Component Dec 10

import { component$, Slot, useStore } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';

import { Menu, HomeOutline, BookOutline, LogoPaypal, LogoDiscord, LogoGithub } from 'qwik-ionicons';

import LoadingIcon from './svg/LoadingIcon';
import Luminescent from './svg/Luminescent';

export default component$(() => {
  const store = useStore({ mobilemenu: false });

  return (
    <Nav>
      <MainNav>
        <NavButton href="/resume" extraClass={{ 'hidden sm:flex': true }}>
          <BookOutline width="24" class="fill-current" /> RESUME
        </NavButton>
        <NavButton external icon href="https://github.com/saboooor" title="GitHub" extraClass={{ 'hidden sm:flex': true }}>
          <LogoGithub width="24" class="fill-green-100" />
        </NavButton>
        <NavButton external icon href="https://mc.luminescent.dev/discord" title="Discord" extraClass={{ 'hidden sm:flex': true }}>
          <LogoDiscord width="24" class="fill-indigo-200" />
        </NavButton>
        <NavButton external icon href="https://paypal.me/youhavebeenyoted" title="PayPal" extraClass={{ 'hidden sm:flex': true }}>
          <LogoPaypal width="24" class="fill-pink-200 text-pink-200" />
        </NavButton>
        <NavButton external icon href="https://luminescent.dev" title="Luminescent" extraClass={{ 'hidden sm:flex justify-center w-12 h-12': true }}>
          <div style={{ filter: 'drop-shadow(0 0 0 #DD6CFF)' }}>
            <div style={{ filter: 'drop-shadow(0 0 1rem #CB6CE6)' }} class="w-10 h-10">
              <Luminescent/>
            </div>
          </div>
        </NavButton>
        <button id="mobile-menu-button" type="button" title="Menu" onClick$={() => {
          store.mobilemenu = !store.mobilemenu;
        }} class="transition  ease-in-out hover:bg-gray-800 hover:text-white px-4 py-2 rounded-lg text-3xl sm:hidden">
          <Menu width="24" class="fill-current" />
        </button>
      </MainNav>
      <MobileNav store={store}>
        <NavButton store={store} href="/resume">
          <BookOutline width="24" class="fill-current" /> RESUME
        </NavButton>
        <div class="flex justify-evenly">
          <NavButton external icon href="https://github.com/saboooor" title="GitHub">
            <LogoGithub width="24" class="fill-green-100" />
          </NavButton>
          <NavButton external icon href="https://mc.luminescent.dev/discord" title="Discord">
            <LogoDiscord width="24" class="fill-indigo-200" />
          </NavButton>
          <NavButton external icon href="https://paypal.me/youhavebeenyoted" title="PayPal">
            <LogoPaypal width="24" class="fill-pink-200 text-pink-200" />
          </NavButton>
          <NavButton external icon href="https://luminescent.dev" title="Luminescent" extraClass="flex xl:hidden justify-center w-8">
            <Luminescent width="24" />
          </NavButton>
        </div>
      </MobileNav>
    </Nav>
  );
});

export const Nav = component$(() => {
  return (
    <nav class="z-20 fixed top-0 w-screen backdrop-blur-xl">
      <div class="font-futura tracking-wider transition-all">
        <Slot />
      </div>
    </nav>
  );
});

export const Brand = component$(() => {
  const location = useLocation();
  return (
    <div class="flex items-center justify-start">
      <Link href="/" class="transition ease-in-out text-gray-300 hover:bg-gray-800 hover:text-white drop-shadow-2xl px-3 py-3 rounded-lg text-lg flex tracking-wider items-center">
        <img width={32} height={32} class="h-8 w-8 rounded-md mr-3" src="https://avatars.githubusercontent.com/u/42164502" alt="sab's pfp" />
        <p>Sab's Portfolio</p>
        <div class={{
          'transition-all': true,
          '-ml-7 opacity-0': !location.isNavigating,
        }}>
          <LoadingIcon/>
        </div>
      </Link>
    </div>
  );
});

export const MainNav = component$(() => {
  return (
    <div class="bg-gray-900/80 px-4 lg:px-6 py-1">
      <div class="mx-auto max-w-7xl relative flex h-16 items-center justify-between">
        <Brand/>
        <div class="flex flex-1 items-center justify-end">
          <div class="flex gap-1 text-gray-300 whitespace-nowrap">
            <Slot/>
          </div>
        </div>
      </div>
    </div>
  );
});

export const MobileNav = component$(({ store }: any) => {
  return (
    <div id="mobile-menu" class={{
      'gap-2 px-3 flex flex-col sm:hidden transition-all duration-300 bg-gray-900/80': true,
      'opacity-100 max-h-screen pt-2 pb-8': store.mobilemenu,
      'opacity-0 max-h-0 py-0 pointer-events-none': !store.mobilemenu,
    }}>
      <Slot />
    </div>
  );
});

export const NavButton = component$(({ href, title, icon, external, extraClass, style, store }: any) => {
  const _class = {
    'group transition ease-in-out hover:bg-gray-800 hover:text-white py-3 rounded-lg items-center': true,
    'text-3xl px-3': icon,
    'px-4 flex gap-3': !icon,
    ...extraClass,
  };

  return <>
    {external &&
      <a href={href} title={title} style={style} class={_class}>
        <Slot />
      </a>
    }
    {!external &&
      <Link href={href} title={title} style={style} class={_class} onClick$={() => { store ? store.mobilemenu = false : undefined; }}>
        <Slot />
      </Link>
    }
  </>;
});