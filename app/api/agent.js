import axios from 'axios';
import { handleError } from './utils';

export const acceptAgent = (conversationId, ticketId, isConfirm) => axios
  .post('agents/accept', { conversationId, ticketId, isConfirm })
  .then(response => ({ response }))
  .catch(handleError);
