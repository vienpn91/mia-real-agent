import cron from 'node-cron';
import TicketService, { closeTicketOfflineQuery } from '../modules/ticket/ticket.service';

export const createTicketOfflineCronJob = (user) => {
  const job = cron.schedule('1 * * * * *',
    () => {
      const query = closeTicketOfflineQuery(user);
      console.log('query', query);
      TicketService.handleCloseTicket(query);
    },
    {
      scheduled: false,
    });
  return job;
};
