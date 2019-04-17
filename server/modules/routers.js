import express from 'express';
/* routers */
import UserRouter from './user/user.route';
import AuthRouter from './auth/auth.route';
const router = express.Router();

export default () => {
  router.use('/users', UserRouter.router);
  router.use('/auth', AuthRouter.router);
  return router;
};
