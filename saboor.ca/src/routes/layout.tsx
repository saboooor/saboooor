import { component$, Slot } from '@builder.io/qwik';
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
