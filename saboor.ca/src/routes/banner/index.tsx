import { RequestHandler } from '@qwik.dev/router';

export const onGet: RequestHandler = async ({ env, send }) => {
  const waves = env.get('waves') as unknown as Env['waves'];
  const bg = await waves?.get('bg', { type: 'arrayBuffer' });

  if (!bg) {
    send(
      new Response('No banner found', {
        status: 404,
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
