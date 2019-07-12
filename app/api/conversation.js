import axios from 'axios';

export const getAllConversation = () => axios
  .get('conversations')
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const createConversation = data => axios
  .post('conversations', data)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const getConversation = id => axios
  .get(`conversations/${id}`)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const updateConversation = ({ _id, ...rest }) => axios
  .put(`conversations/${_id}`, rest)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const removeConversation = id => axios
  .delete(`conversations/${id}`)
  .then(response => ({ response }))
  .catch(error => ({ error }));
