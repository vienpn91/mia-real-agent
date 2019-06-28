import _ from 'lodash';
import ticketCollection from './ticket.model';
import BaseService from '../base/base.service';

class TicketService extends BaseService { }

export default new TicketService(ticketCollection);
