import BaseRouter from '../base/base.route';
import UserController from './user.controller';
import { ROLES } from '../../../common/enums';
import { allow } from '../../middlewares/verifyMiddlewares';

class UserRouter extends BaseRouter {
  constructor() {
    super(UserController);
    this.router.post('/', allow(ROLES.ADMIN), UserController.createUser);
    this.router.put(
      '/assign-role/:id',
      allow(ROLES.ADMIN),
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
      '/changePassword',
      UserController.changePassword,
    );
    this.router.post(
      '/createPassword',
      UserController.createPassword,
    );
    this.router.post(
      '/checkPassword',
      UserController.checkPassword,
    );
    this.router.post(
      '/agent/findAvailable',
      UserController.findAgent,
    );
    this.router.post(
      '/agent/accept/:id',
      UserController.acceptRequest,
    );
  }
}

export default new UserRouter();
