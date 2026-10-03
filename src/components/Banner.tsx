import { component$, useSignal, type PropsOf } from '@qwik.dev/core';

export default component$((props: PropsOf<'img'>) => {
  const failed = useSignal(false);

  return (
    <img
      {...props}
      src={failed.value ? '/banner-placeholder.svg' : '/banner'}
      onError$={() => {
        failed.value = true;
      }}
    />
  );
});
