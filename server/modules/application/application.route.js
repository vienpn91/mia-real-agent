import BaseRouter from '../base/base.route';
import ApplicationController from './application.controller';

class ApplicationRouter extends BaseRouter {
  constructor(controller) {
    super(controller);
    this.router.post('/approve/:id', this.controller.approveApplication);
    this.router.put('/:id/status/:status', this.controller.updateStatus);
  }
}

export default new ApplicationRouter(ApplicationController);
