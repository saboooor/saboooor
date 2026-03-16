import { RequestHandler } from '@qwik.dev/router';

export const onGet: RequestHandler = ({ redirect }) => {
  throw redirect(302, 'https://discord.gg/sf5Hty88TR');
};