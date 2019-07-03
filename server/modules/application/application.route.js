import BaseRouter from '../base/base.route';
import ApplicationController from './application.controller';

class ApplicationRouter extends BaseRouter {
  constructor(controller) {
    super(controller);
    this.router.post('/approve/:id', this.controller.approveApplication);
  }
}

export default new ApplicationRouter(ApplicationController);
