import { component$, Slot } from '@qwik.dev/core';
import Footer from '~/components/Footer';
import Nav from '~/components/Nav';

export default component$(() => {
  return (
    <>
      <Nav />
      <Slot />
      <Footer />
    </>
  );
});
