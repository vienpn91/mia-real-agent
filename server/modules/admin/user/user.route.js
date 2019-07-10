import BaseRouter from '../../base/base.route';
import UserController from './user.controller';

class AdminUserRouter extends BaseRouter {
  constructor() {
    super(UserController);
    this.router.post('/', UserController.createUser);
    this.router.put(
      '/assign-role/:id',
      UserController.assignRoles,
    );

    this.router.get(
      '/:id',
      UserController.getUserProfile,
    );
    this.router.put(
      '/:id',
      UserController.updateUserProfile,
    );
    this.router.post(
      '/:id/changePassword',
      UserController.changePassword,
    );
    this.router.post(
      '/:id/createPassword',
      UserController.createPassword,
    );
  }
}

export default new AdminUserRouter();
