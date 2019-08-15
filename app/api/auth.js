import axios from 'axios';
import { handleError } from './utils';

/**
   * login method
   * @param params: email, password
   */
export const login = (usernameOrEmail, password) => axios
  .post('auth/login', {
    usernameOrEmail,
    password,
  })
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const register = data => axios
  .post('auth/register', {
    data,
  })
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const sendVericationEmail = email => axios
  .get(`auth/register/send-verication-email/${email}`)
  .then(response => ({ response }))
  .catch(error => handleError(error));

export const createPassword = newPassword => axios
  .post('auth/createPassword', {
    newPassword,
  })
  .then(response => ({ response }))
  .catch(error => handleError(error));
