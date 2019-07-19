import BaseRouter from '../../base/base.route';
import AdminApplicationController from './application.controller';

class AdminTicketRouter extends BaseRouter {
  constructor() {
    super(AdminApplicationController);
  }
}
export default new AdminTicketRouter(AdminApplicationController);
