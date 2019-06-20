import _get from 'lodash/get';

export const getTokenFromReq = (req) => {
  const token = _get(req, 'headers.authorization');

  return token.replace(/^bearer /i, '');
};
