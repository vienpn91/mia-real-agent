import axios from 'axios';

export const createApplication = data => axios
  .post('applications', data)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const adminGetAllApplication = params => axios
  .get('admin/applications', { params })
  .then(response => ({ response }))
  .catch(error => ({ error }));
