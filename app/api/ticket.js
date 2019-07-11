import axios from 'axios';

export const createTicket = data => axios
  .post('tickets', data)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const getAllTicket = params => axios
  .get('tickets', { params })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const getTicket = (id, owner) => axios
  .get(`tickets/${id}${owner ? `?owner=${owner}` : ''}`)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const updateTicket = ({ ticketId, ...rest }) => axios
  .put(`tickets/${ticketId}`, rest)
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

export const adminGetAllTicket = params => axios
  .get('admin/tickets', { params })
  .then(response => ({ response }))
  .catch(error => ({ error }));
