import axios from 'axios';

export const createApplication = data => axios
  .post('applications', data)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const adminGetAllApplication = params => axios
  .get('admin/applications', { params })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const approveApplication = id => axios
  .post(`applications/${id}/approve`)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const rejectApplication = id => axios
  .post(`applications/${id}/reject`)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const reviewApplication = id => axios
  .post(`applications/${id}/review`)
  .then(response => ({ response }))
  .catch(error => ({ error }));
