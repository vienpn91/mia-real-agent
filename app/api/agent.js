import axios from 'axios';

export const findAvailableAgent = ticketId => axios
  .post('agents/search', {
    ticketId,
  })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const acceptAgent = (id, ticketId, isConfirm) => axios
  .post(`agents/${id}/accept`, { ticketId, isConfirm })
  .then(response => ({ response }))
  .catch(error => ({ error }));
