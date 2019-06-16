import BaseController from '../base/base.controller';
import TicketService from './ticket.service';

class TicketController extends BaseController {}

export default new TicketController(TicketService);
