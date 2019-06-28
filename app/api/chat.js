import axios from 'axios';

export const createChat = data => axios
  .post('chats', data)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const getChat = id => axios
  .get(`chats/${id}`)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const updateChat = ({ _id, ...rest }) => axios
  .put(`chats/${_id}`, rest)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const removeChat = id => axios
  .delete(`chats/${id}`)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const sendMessage = (id, data) => axios
  .post(`chats/${id}`, data)
  .then(response => ({ response }))
  .catch(error => ({ error }));
