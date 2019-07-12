import axios from 'axios';

export const createApplication = data => axios
  .post('applications', data)
  .then(response => ({ response }))
  .catch(error => ({ error }));
