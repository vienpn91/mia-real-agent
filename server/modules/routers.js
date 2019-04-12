import express from 'express';

/* routers */
import userRouter from './user/user.route';
const router = express.Router();

module.exports = () => {
  router.use('/users', userRouter.router);
  return router;
};
