import axios from 'axios';

export const createTicket = data => axios
  .post('tickets', data)
  .then(response => ({ response }))
  .catch(error => ({ error }));
