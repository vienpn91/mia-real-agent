import httpStatus from 'http-status';
import BaseController from '../base/base.controller';
import ApplicationService from './application.service';
import UserService from '../user/user.service';
// import { randomPassword } from '../../utils/utils';
import { hashFunc } from '../../utils/bcrypt';
import { ROLES, APPLICATION_STATUS } from '../../../common/enums';

class ApplicationController extends BaseController {
  constructor(service) {
    super(service);
    this.approveApplication = this.approveApplication.bind(this);
    this.rejectApplication = this.rejectApplication.bind(this);
    this.reviewApplication = this.reviewApplication.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
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

      await UserService.insert(newUserPayload);

      const result = await this.updateStatus(application, APPLICATION_STATUS.APPROVED);

      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async rejectApplication(req, res) {
    try {
      const { model: application } = req;
      const result = await this.updateStatus(application, APPLICATION_STATUS.REJECTED);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async reviewApplication(req, res) {
    try {
      const { model: application } = req;
      const result = await this.updateStatus(application, APPLICATION_STATUS.REVIEWING);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async updateStatus(application, status) {
    application.set({ status });
    const result = await application.save();
    return result;
  }
}

export default new ApplicationController(ApplicationService);
