import BaseRouter from '../base/base.route';
import TicketController from './ticket.controller';

class TicketRouter extends BaseRouter {
  constructor() {
    super(TicketController);
  }
}
export default new TicketRouter(TicketController);
