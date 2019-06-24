export const VALIDATION_ERROR_MESSAGE = {
  REQUIRED: 'Required',
  INVALID: 'Invalid',
  TOO_SHORT: 'Too Short',
  TOO_LONG: 'Too Long',
  PHONE_INVALID: 'Phone number is not valid',
  PASSWORD_INVALID:
    'Password (UpperCase, LowerCase and Number) with length 6 and 50 character',
  CONFIRM_PASSWORD: 'The confirm password is not the same the password',
};

export const VALIDATION_TYPE = {
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD',
  STRING: 'STRING',
};

export const ROLES = {
  ADMIN: 'admin',
  INDIVIDUAL: 'individual',
  BUSINESS: 'business',
  FREELANCER: 'freelancer',
  EMPLOYEE: 'employee',
};

export const TICKET_STATUS = {
  NEW: 'New',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  SEARCHING: 'Searching',
};

export const COLOR_BY_STATUS = {
  New: '#449bea',
  Resolved: '#05ca05',
  Closed: '#d4101e',
  Pending: '#e5cc94',
  Processing: '#9ccd44',
  Searching: '#69889d',
};