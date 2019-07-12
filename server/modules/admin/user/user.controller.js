import httpStatus from 'http-status';
import BaseController from '../../base/base.controller';
import ApplicationService from '../../application/application.service';
import UserService from '../../user/user.service';
import { ROLES } from '../../../../common/enums';

class UserController extends BaseController {
  constructor() {
    super(UserService);
  }

  get = async (req, res) => {
    try {
      const { model: user } = req;
      const userObj = user.toObject();
      const { role, application: applicationId } = userObj;

      if (role === ROLES.AGENT) {
        const applicationDoc = await ApplicationService.get(applicationId);
        userObj.application = applicationDoc;
      }

      return res.status(httpStatus.OK).send(userObj);
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}

export default new UserController();
