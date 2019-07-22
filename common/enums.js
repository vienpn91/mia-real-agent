const VALIDATION_ERROR_MESSAGE = {
  REQUIRED: 'Required',
  INVALID: 'Invalid',
  TOO_SHORT: 'Too Short',
  TOO_LONG: 'Too Long',
  PHONE_INVALID: 'Phone number is not valid',
  PASSWORD_INVALID:
    'Password (UpperCase, LowerCase and Number) with length 6 and 50 character',
  CONFIRM_PASSWORD: 'The confirm password is not the same the password',
};

const VALIDATION_TYPE = {
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD',
  STRING: 'STRING',
};

const ROLES = {
  ADMIN: 'admin',
  INDIVIDUAL: 'individual',
  AGENT: 'agent',
  BUSINESS: 'business',
  FREELANCER: 'freelancer',
  EMPLOYEE: 'employee',
};

const TICKET_STATUS = {
  OPEN: 'Open',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  SEARCHING: 'Searching',
};

const COLOR_BY_STATUS = {
  Open: '#449bea',
  Resolved: '#05ca05',
  Closed: '#d4101e',
  Pending: '#e5cc94',
  Processing: '#9ccd44',
  Searching: '#69889d',
  Assigned: '',
};

const POPUP_TYPE = {
  CONFIRM: 'confirm',
  ERROR: 'error',
  MESSAGE: 'message',
};

const POSITION_OPTIONS = [
  {
    label: 'IT',
    value: 'IT',
  },
  {
    label: 'CEO',
    value: 'CEO',
  },
  {
    label: 'John Wick',
    value: 'John Wick',
  },
];


const SIZE_OPTIONS = [
  {
    label: 'Self-employed',
    value: 'A',
  },
  {
    label: '1-10 employees',
    value: 'B',
  },
  {
    label: '11-50 employees',
    value: 'C',
  },
  {
    label: '51-200 employees',
    value: 'D',
  },
  {
    label: '201-500 employees',
    value: 'E',
  },
  {
    label: '501-1000 employees',
    value: 'F',
  },
  {
    label: '1001-5000 employees',
    value: 'G',
  },
  {
    label: '5001-10,000 employees',
    value: 'H',
  },
  {
    label: '10,001+ employees',
    value: 'I',
  },
];

const FIELD_OPTIONS = [
  {
    label: 'IT',
    value: 'IT',
  },
  {
    label: 'Consultant',
    value: 'Consultant',
  },
  {
    label: 'Accounting',
    value: 'Accounting',
  },
];

const CATEGORY_OPTIONS = [
  {
    label: 'IT',
    value: 'IT',
  },
  {
    label: 'Consultant',
    value: 'Consultant',
  },
  {
    label: 'Accounting',
    value: 'Accounting',
  },
];

const APPLICATION_STATUS = {
  PENDING: 'Pending',
  REVIEWING: 'Reviewing',
  REJECTED: 'Rejected',
  APPROVED: 'Approved',
};

const APPLICATION_TYPE = {
  FREELANCER: 'Freelancer',
  FULLTIME: 'Fulltime',
};

const APPLICATION_LANGUAGE = {
  VIETNAMESE: 'Vietnamese',
  CHINESE: 'Chinese',
  JANPANESE: 'Japanese',
  ENGLISH: 'English',
};

const PAGE_SIZE = 10;

module.exports.PAGE_SIZE = PAGE_SIZE;
module.exports.VALIDATION_ERROR_MESSAGE = VALIDATION_ERROR_MESSAGE;
module.exports.VALIDATION_TYPE = VALIDATION_TYPE;
module.exports.ROLES = ROLES;
module.exports.TICKET_STATUS = TICKET_STATUS;
module.exports.COLOR_BY_STATUS = COLOR_BY_STATUS;
module.exports.POPUP_TYPE = POPUP_TYPE;
module.exports.POSITION_OPTIONS = POSITION_OPTIONS;
module.exports.SIZE_OPTIONS = SIZE_OPTIONS;
module.exports.FIELD_OPTIONS = FIELD_OPTIONS;
module.exports.CATEGORY_OPTIONS = CATEGORY_OPTIONS;
module.exports.APPLICATION_STATUS = APPLICATION_STATUS;
module.exports.APPLICATION_TYPE = APPLICATION_TYPE;
module.exports.APPLICATION_LANGUAGE = APPLICATION_LANGUAGE;
