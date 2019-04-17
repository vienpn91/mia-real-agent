import passport from 'passport';
import get from 'lodash/get';

export const authenticateMiddleware = passport.authenticate('jwt', { session: false });

/**
 * authenication middleware, check header and authenticate if needed
 */
export const authenticateApi = (req, res, next) => {
  const authorization = get(req, 'headers.authorization');
  if (authorization) {
    authenticateMiddleware(req, res, next);
  } else {
    next();
  }
};
