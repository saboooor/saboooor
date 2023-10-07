import { component$, Slot } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';

import { LogoDiscord, LogoGithub, DocumentOutline, Menu, LogoPaypal } from 'qwik-ionicons';

import Luminescent from './icons/Luminescent';
import LoadingIcon from './icons/LoadingIcon';

export default component$(() => {
  return (
    <Nav>
        <MainNav>
          <NavButton href="/resume" extraClass="hidden xl:flex gap-3">
            <DocumentOutline width="24" class="fill-green-100" />
            Resume
          </NavButton>
          <NavButton external icon href="https://github.com/LuminescentDev/SimplyMC" title="GitHub" extraClass="hidden xl:flex">
            <LogoGithub width="24" class="fill-green-100" />
          </NavButton>
          <NavButton external icon href="https://discord.simplymc.art" title="Discord" extraClass="hidden xl:flex">
            <LogoDiscord width="24" class="fill-indigo-200" />
          </NavButton>
          <NavButton external icon href="https://paypal.me/youhavebeenyoted" title="PayPal" extraClass="hidden xl:flex">
            <LogoPaypal width="24" class="fill-pink-200 text-pink-200" />
          </NavButton>
          <NavButton external icon href="https://luminescent.dev" title="Luminescent" extraClass="hidden xl:flex justify-center w-10 h-10">
            <div style={{ filter: 'drop-shadow(0 0 0 #DD6CFF)' }}>
              <div style={{ filter: 'drop-shadow(0 0 1rem #CB6CE6)' }} class="w-10 h-10">
                <Luminescent/>
              </div>
            </div>
          </NavButton>
          <button id="mobile-menu-button" type="button" title="Menu" onClick$={() => {
            const classList = document.getElementById('mobile-menu')?.classList;
            if (classList?.contains('hidden')) classList.replace('hidden', 'flex');
            else classList?.replace('flex', 'hidden');
          }} class="transition ease-in-out hover:bg-gray-800 hover:text-white p-2 rounded-lg text-3xl xl:hidden">
            <Menu width="24" />
          </button>
        </MainNav>
        <MobileNav>
          <NavButton mobile href="/resume" extraClass="flex gap-3">
            <DocumentOutline width="24" class="fill-green-100" />
            Resume
          </NavButton>
          <div class="flex justify-evenly">
            <NavButton external mobile icon href="https://github.com/LuminescentDev/SimplyMC" title="GitHub" extraClass="flex xl:hidden">
              <LogoGithub width="24" class="fill-green-100" />
            </NavButton>
            <NavButton external mobile icon href="https://discord.simplymc.art" title="Discord" extraClass="flex xl:hidden">
              <LogoDiscord width="24" class="fill-indigo-200" />
            </NavButton>
            <NavButton external mobile icon href="https://paypal.me/youhavebeenyoted" title="PayPal" extraClass="flex xl:hidden">
              <LogoPaypal width="24" class="fill-pink-200 text-pink-200" />
            </NavButton>
            <NavButton external mobile icon href="https://luminescent.dev" title="Luminescent" extraClass="flex xl:hidden justify-center w-10 h-10">
              <div style={{ filter: 'drop-shadow(0 0 0 #DD6CFF)' }}>
                <div style={{ filter: 'drop-shadow(0 0 1rem #CB6CE6)' }} class="w-10 h-10">
                  <Luminescent/>
                </div>
              </div>
            </NavButton>
          </div>
        </MobileNav>
    </Nav>
  );
});

export const Nav = component$(() => {
  return (
    <nav class="z-20 fixed top-0 w-screen py-2 bg-gray-900/70 backdrop-blur-xl">
      <div class="mx-auto max-w-7xl px-4 lg:px-6">
        <Slot />
      </div>
    </nav>
  );
});

export const Brand = component$(() => {
  const location = useLocation();
  return (
    <div class="flex items-center justify-start">
      <Link href="/" class="transition ease-in-out text-gray-300 hover:bg-gray-800 hover:text-white drop-shadow-2xl px-2 py-2 rounded-lg text-lg flex gap-3 items-center whitespace-nowrap">
        <img width={32} height={32} class="h-8 w-8 rounded-md" src="https://avatars.githubusercontent.com/u/42164502" alt="sab's pfp" />
        <span class="font-bold">Sab's Portfolio</span>
        <div class={`${location.isNavigating ? '-ml-2' : '-ml-10 opacity-0'} transition-all`}>
          <LoadingIcon/>
        </div>
      </Link>
    </div>
  );
});

export const MainNav = component$(() => {
  return (
    <div class="relative flex h-16 items-center justify-between">
      <Brand/>
      <div class="flex flex-1 items-center justify-end">
        <div class="flex gap-2 text-gray-300 whitespace-nowrap">
          <Slot/>
        </div>
      </div>
    </div>
  );
});

export const MobileNav = component$(() => {
  return (
    <div id="mobile-menu" class="gap-4 py-4 px-3 bg-black rounded-lg mt-2 hidden flex-col xl:hidden">
      <Slot />
    </div>
  );
});

export const NavButton = component$(({ href, title, icon, external, extraClass, style }: any) => {
  return <>
    {external &&
      <a href={href} title={title} style={style} class={`group transition ease-in-out hover:bg-gray-800 hover:text-white ${icon ? 'text-3xl px-2' : 'px-4'} py-2 rounded-lg items-center ${extraClass}`}>
        <Slot />
      </a>
    }
    {!external &&
      <Link href={href} onClick$={async () => { document.getElementById('mobile-menu')?.classList.replace('flex', 'hidden'); }} title={title} style={style} class={`group transition ease-in-out hover:bg-gray-800 hover:text-white ${icon ? 'text-3xl px-2' : 'px-4'} py-2 rounded-lg items-center ${extraClass}`}>
        <Slot />
      </Link>
    }
  </>;
});