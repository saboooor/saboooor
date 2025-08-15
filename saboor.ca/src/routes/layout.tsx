import { component$, Slot } from '@builder.io/qwik';
import Nav from '../components/Nav';

export default component$(() => {
  return (
    <>
      <Nav />
      <Slot />
    </>
  );
});
