import axios from 'axios';

export const createTicket = data => axios
  .post('tickets', data)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const getAllTicket = params => axios
  .get('tickets', { params })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const getTicket = id => axios
  .get(`tickets/${id}`)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const updateTicket = ({ _id, ...rest }) => axios
  .put(`tickets/${_id}`, rest)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const removeTicket = id => axios
  .delete(`tickets/${id}`)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const insertChat = (id, data) => axios
  .post(`tickets/chat/${id}`, data)
  .then(response => ({ response }))
  .catch(error => ({ error }));
