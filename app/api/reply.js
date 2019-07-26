import axios from 'axios';

export const sendReplyMessage = (from, to, conversation, message) => axios
  .post('/reply', {
    from, to, conversation, message,
  })
  .then(response => ({ response }))
  .catch(error => ({ error }));
