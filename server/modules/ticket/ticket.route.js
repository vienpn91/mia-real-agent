import BaseRouter from '../base/base.route';
import TicketController from './ticket.controller';

class TicketRouter extends BaseRouter {
  constructor() {
    super(TicketController);

    this.router.get('/:id/conversations', this.controller.getAllConversations); // get conversation by ticket id
  }
}
export default new TicketRouter(TicketController);
