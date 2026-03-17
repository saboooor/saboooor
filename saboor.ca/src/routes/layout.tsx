import { component$, Slot } from '@qwik.dev/core';
import Footer from '~/components/Footer';

export default component$(() => {
  return (
    <>
      <Slot />
      <Footer />
    </>
  );
});
