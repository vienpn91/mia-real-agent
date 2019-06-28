import BaseController from '../base/base.controller';
import TicketService from './ticket.service';

class TicketController extends BaseController {
  constructor() {
    super(TicketService);
  }
}

export default new TicketController(TicketService);
