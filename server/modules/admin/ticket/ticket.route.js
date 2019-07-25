import BaseRouter from '../../base/base.route';
import AdminTicketController from './ticket.controller';

class AdminTicketRouter extends BaseRouter {
  constructor() {
    super(AdminTicketController);
    this.router.get(
      '/dashboard/activity',
      AdminTicketController.getTicketActivity,
    );
  }
}
export default new AdminTicketRouter(AdminTicketController);
