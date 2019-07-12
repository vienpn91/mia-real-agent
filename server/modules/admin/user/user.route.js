import BaseRouter from '../../base/base.route';
import UserController from './user.controller';

class AdminUserRouter extends BaseRouter {
  constructor() {
    super(UserController);
  }
}

export default new AdminUserRouter();
