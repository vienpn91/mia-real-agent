import _get from 'lodash/get';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;

export const getTokenFromReq = (req) => {
  const token = _get(req, 'headers.authorization');

  return token.replace(/^Bearer\s+/i, '');
};

export const randomPassword = () => {
  let result = '';
  for (let i = 0; i < 10; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
