import axios from 'axios';

/**
   * login method
   * @param params: email, password
   */
export const login = ({ email, password }) => axios
  .post('auth/login', {
    email,
    password,
  })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const register = data => axios
  .post('auth/register', { data })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const sendVericationEmail = email => axios
  .get(`auth/register/send-verication-email/${email}`)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const changePassword = data => axios
  .post('auth/changePassword', { data })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const createPassword = data => axios
  .post('auth/createPassword', { data })
  .then(response => ({ response }))
  .catch(error => ({ error }));
