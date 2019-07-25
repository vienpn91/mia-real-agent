import BaseRouter from '../../base/base.route';
import AdminApplicationController from './application.controller';

class AdminTicketRouter extends BaseRouter {
  constructor() {
    super(AdminApplicationController);
    this.router.get(
      '/dashboard/summary',
      AdminApplicationController.getApplicationSummary,
    );
  }
}
export default new AdminTicketRouter(AdminApplicationController);
