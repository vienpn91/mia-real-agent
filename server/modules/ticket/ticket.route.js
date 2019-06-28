import BaseRouter from '../base/base.route';
import TicketController from './ticket.controller';

class ConversationRouter extends BaseRouter {
  constructor() {
    super(TicketController);
  }
}
export default new ConversationRouter(TicketController);
