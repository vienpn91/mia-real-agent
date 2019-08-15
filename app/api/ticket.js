import axios from 'axios';
import { handleError } from './utils';

export const createTicket = data => axios
  .post('tickets', data)
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const getAllTicket = params => axios
  .get('tickets', { params })
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const getTicket = id => axios
  .get(`tickets/${id}`)
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const updateTicket = ({ ticketId, ...rest }) => axios
  .put(`tickets/${ticketId}`, rest)
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const getConversationByTicketId = ticketId => axios
  .get(`tickets/${ticketId}/conversations`)
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const findAgent = ticketId => axios
  .post(`tickets/${ticketId}/find_agent`)
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const closeTicket = id => axios
  .post(`tickets/${id}/close`)
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const insertChat = (id, data) => axios
  .post(`tickets/chat/${id}`, data)
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const adminGetAllTicket = params => axios
  .get('admin/tickets', { params })
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const get = id => axios
  .get(`admin/tickets/${id}`)
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const getProfile = id => axios
  .get(`tickets/${id}/profile`)
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const getActivity = () => axios
  .get('admin/tickets/dashboard/activity')
  .then(response => ({ response }))
  .catch(error => handleError(error));
