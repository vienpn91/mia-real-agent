import httpStatus from 'http-status';
import BaseController from '../base/base.controller';
import ApplicationService from './application.service';
import UserService from '../user/user.service';
// import { randomPassword } from '../../utils/utils';
import { hashFunc } from '../../utils/bcrypt';
import { ROLES } from '../../../common/enums';

class ApplicationController extends BaseController {
  constructor(service) {
    super(service);
    this.approveApplication = this.approveApplication.bind(this);
  }

  async approveApplication(req, res) {
    try {
      const { model: application } = req;
      const { email, _id } = application;
      const passwordString = '123456789'; // should generate random password and send email to user
      const hashPassword = await hashFunc(passwordString);
      const newUserPayload = {
        username: email,
        email,
        password: hashPassword,
        role: ROLES.AGENT,
        application: _id,
      };

      const user = await UserService.insert(newUserPayload);

      return res.status(httpStatus.OK).send(user);
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}

export default new ApplicationController(ApplicationService);
