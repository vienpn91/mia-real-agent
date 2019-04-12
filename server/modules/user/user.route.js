import passport from 'passport';
import BaseRouter from '../base/base.route';
import userController from './user.controller';
import ROLES_BY_VALUE from '../../../common/enums';
import { allow } from '../../middlewares/verifyMiddlewares';

const {
  ADMIN: { value: ADMIN_ROLE },
} = ROLES_BY_VALUE;

class UserRouter extends BaseRouter {
  constructor() {
    super(userController);
    this.router.post('/login', userController.login);
    this.router.post('/register', userController.insertProcess);
    this.router.post('/', allow(ADMIN_ROLE), userController.createUser);
    this.router.put(
      '/assign-role/:id',
      allow(ADMIN_ROLE),
      userController.assignRoles,
    );
    this.router.get(
      '/register/send-verication-email/:email',
      userController.sendVericationEmail,
    );
    this.router.get('/verify/:token', userController.verifyAccount);
    this.router.post(
      '/changePassword',
      passport.authenticate('jwt', { session: false }),
      userController.changePassword,
    );
    this.router.post(
      '/createPassword',
      passport.authenticate('jwt', { session: false }),
      userController.createPassword,
    );

    this.router.get(
      '/login/google',
      passport.authenticate('google', {
        scope: ['email'],
        session: false,
      }),
    );

    this.router.get(
      '/login/google/callback',
      userController.loginWithGoogleCallback,
    );

    this.router.get(
      '/login/facebook',
      passport.authenticate('facebook', {
        session: false,
        scope: ['email'],
      }),
    );

    this.router.get(
      '/login/facebook/callback',
      userController.loginWithFacebookCallback,
    );

    this.router.get(
      '/profile/:id',
      passport.authenticate('jwt', { session: false }),
      userController.getUserProfile,
    );

    this.router.put(
      '/profile/:id',
      passport.authenticate('jwt', { session: false }),
      this.controller.updateUserProfile,
    );

    this.router.post(
      '/address',
      passport.authenticate('jwt', { session: false }),
      userController.addAddress,
    );

    this.router.put(
      '/address/set-default',
      passport.authenticate('jwt', { session: false }),
      userController.setDefaultAddress,
    );

    this.router.put(
      '/address/edit',
      passport.authenticate('jwt', { session: false }),
      userController.editAddress,
    );

    this.router.delete(
      '/address/:index',
      passport.authenticate('jwt', { session: false }),
      userController.deleteAddress,
    );
  }
}

export default new UserRouter();
