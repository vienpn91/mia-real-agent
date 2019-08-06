import axios from 'axios';

export const sendReplyMessage = (from, to, conversationId, messages) => axios
  .post('/reply', {
    from, to, conversationId, messages,
  })
  .then(response => ({ response }))
  .catch(error => ({ error }));
