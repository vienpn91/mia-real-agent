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

export const changePassword = (userId, oldPassword, newPassword) => axios
  .post(`users/${userId}/changePassword`, {
    oldPassword,
    newPassword,
  })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const findAvailableAgent = ticketId => axios
  .post('agents/search', {
    ticketId,
  })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const acceptAgent = (id, ticketId, isConfirm) => axios
  .post(`agents/${id}/accept`, { ticketId, isConfirm })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const list = params => axios
  .get('admin/users/', { params })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const get = id => axios
  .get(`admin/users/${id}`)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const update = (id, data) => axios
  .put(`admin/users/${id}`, { data })
  .then(response => ({ response }))
  .catch(error => ({ error }));
export const insert = data => axios
  .post('admin/users/', { data })
  .then(response => ({ response }))
  .catch(error => ({ error }));
