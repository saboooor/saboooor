import { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = ({ redirect }) => {
  throw redirect(302, 'https://discord.gg/sf5Hty88TR');
};