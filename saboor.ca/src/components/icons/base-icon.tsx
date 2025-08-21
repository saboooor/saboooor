import { component$, QwikDOMAttributes, Slot } from '@builder.io/qwik';

export interface IconProps extends QwikDOMAttributes {
  size?: number,
  name: string
}

export default component$(({
  size = 24,
  ...restProps
}: IconProps) => {
  return <svg
    {...restProps}
    xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'
    width={size} height={size}
  >
    <Slot/>
  </svg>;
});
