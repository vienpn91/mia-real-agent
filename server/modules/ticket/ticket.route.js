import BaseRouter from '../base/base.route';
import TicketController from './ticket.controller';

class TicketRouter extends BaseRouter {
  constructor(controller) {
    super(controller);

    this.router.get('/:id/conversations', this.controller.getAllConversations); // get conversation by ticket id
    this.router.post('/:id/find_agent', this.controller.findAvailableAgents);
  }
}
export default new TicketRouter(TicketController);
