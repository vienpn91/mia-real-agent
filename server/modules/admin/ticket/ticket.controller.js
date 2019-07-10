import httpStatus from 'http-status';
import BaseController from '../../base/base.controller';
import TicketService from '../../ticket/ticket.service';

class AdminTicketController extends BaseController {
  constructor() {
    super(TicketService);
  }

  insert = async (req, res) => res.status(httpStatus.NOT_FOUND).send()
}

export default new AdminTicketController(TicketService);
