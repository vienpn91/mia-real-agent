import axios from 'axios';

/**
   * login method
   * @param params: email, password
   */
export const login = (email, password) => axios
  .post('auth/login', {
    email,
    password,
  })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const register = data => axios
  .post('auth/register', {
    data,
  })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const sendVericationEmail = email => axios
  .get(`auth/register/send-verication-email/${email}`)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const createPassword = newPassword => axios
  .post('auth/createPassword', {
    newPassword,
  })
  .then(response => ({ response }))
  .catch(error => ({ error }));
