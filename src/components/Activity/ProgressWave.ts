// No viewBox: wave coordinates stay in pixels as the SVG viewport reveals progress.
export const squigglePath =
  'M0 6 Q6 2 12 6 ' +
  Array.from({ length: 1023 }, (_, index) => `T${(index + 2) * 12} 6`).join(
    ' '
  );
