import axios from 'axios';

export const getUserProfile = id => axios
  .get(`users/${id}`)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const updateUserProfile = (id, data) => axios
  .put(`users/${id}`, { data })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const addAddress = data => axios
  .post('users/address', { data })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const setDefaultAddress = data => axios
  .put('users/address/set-default', { data })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const editAddress = data => axios
  .put('users/address/edit', { data })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const deleteAddress = index => axios
  .delete(`users/address/${index}`)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const checkPassword = (userId, password) => axios
  .post('users/checkPassword', {
    userId, password,
  })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const changePassword = (oldPassword, newPassword) => axios
  .post('users/changePassword', {
    oldPassword,
    newPassword,
  })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const findAvailableAgent = ticketId => axios
  .post('users/agent/findAvailable', {
    ticketId,
  })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const acceptAgent = (id, ticketId, isConfirm) => axios
  .post(`users/agent/accept/${id}`, { ticketId, isConfirm })
  .then(response => ({ response }))
  .catch(error => ({ error }));
