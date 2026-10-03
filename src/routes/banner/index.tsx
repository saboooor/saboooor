import { RequestHandler } from '@qwik.dev/router';

export const onGet: RequestHandler = async ({ env, send }) => {
  const waves = env.get('waves') as unknown as Env['waves'];
  let bg: ArrayBuffer | null = null;
  try {
    bg = (await waves?.get('bg', { type: 'arrayBuffer' })) ?? null;
  } catch {
    // Keep the banner available when KV is temporarily unreachable.
  }

  if (!bg) {
    send(
      new Response(null, {
        status: 302,
        headers: {
          Location: '/banner-placeholder.svg',
          'Cache-Control': 'no-store',
        },
      })
    );
    return;
  }

  send(
    new Response(bg, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  );
};
