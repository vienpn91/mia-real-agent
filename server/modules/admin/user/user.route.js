import BaseRouter from '../../base/base.route';
import UserController from './user.controller';

class AdminUserRouter extends BaseRouter {
  constructor() {
    super(UserController);
    this.router.get(
      '/dashboard/summary',
      UserController.getUserSummary,
    );
  }
}

export default new AdminUserRouter();
