import TicketService, { closeTicketOfflineQuery } from '../modules/ticket/ticket.service';

export const closeTicketTimeOut = user => setTimeout(() => {
  const query = closeTicketOfflineQuery(user);
  TicketService.handleCloseTicket(query);
}, 300000);

export const idleTicketTimeOut = ticketId => setTimeout(() => {
  TicketService.handleTicketIdle(ticketId);
}, 300000);
