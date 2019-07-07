import axios from 'axios';

export function configAxios() {
  axios.defaults.baseURL = '/api';
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
}

export function configToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}
