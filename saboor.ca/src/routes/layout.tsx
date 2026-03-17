import { component$, Slot } from '@builder.io/qwik';
import Footer from '~/components/Footer';

export default component$(() => {
  return (
    <>
      <Slot />
      <Footer />
    </>
  );
});
