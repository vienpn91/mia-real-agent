import BaseRouter from '../base/base.route';
import ApplicationController from './application.controller';

class ApplicationRouter extends BaseRouter {}

export default new ApplicationRouter(ApplicationController);
