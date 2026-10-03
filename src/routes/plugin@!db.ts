import type { RequestHandler } from '@qwik.dev/router';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../drizzle/schema';
import { initializeDbIfNeeded } from '~/util/db';

export const onRequest: RequestHandler = async ({ platform }) => {
  const env = platform.env as Env | undefined;
  if (env?.music) {
    await initializeDbIfNeeded(() =>
      Promise.resolve(drizzle(env.music, { schema }))
    );
  }
};
