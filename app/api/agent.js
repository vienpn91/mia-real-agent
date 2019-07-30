import axios from 'axios';

export const acceptAgent = (id, ticketId, isConfirm) => axios
  .post('agents/accept', { ticketId, isConfirm })
  .then(response => ({ response }))
  .catch(error => ({ error }));
