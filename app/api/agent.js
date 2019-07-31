import axios from 'axios';

export const acceptAgent = (conversationId, ticketId, isConfirm) => axios
  .post('agents/accept', { conversationId, ticketId, isConfirm })
  .then(response => ({ response }))
  .catch(error => ({ error }));
