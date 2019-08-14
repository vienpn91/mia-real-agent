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
  AGENT: 'agent',
  BUSINESS: 'business',
  FREELANCER: 'freelancer',
  FULLTIME: 'fulltime',
  EMPLOYEE: 'employee',
  MIA_AGENT: 'mia_agent',
};

export const TICKET_STATUS = {
  OPEN: 'Open',
  CLOSED: 'Closed',
  PENDING: 'Pending',
  IDLE: 'Idle',
  PROCESSING: 'Processing',
  OFFLINE: 'Offline',
};

export const COLOR_BY_STATUS = {
  Open: '#449bea',
  Closed: '#d4101e',
  Pending: '#e5cc94',
  Processing: '#05ca05',
  Idle: '#f7d00f',
  Offline: '#8e8e8e',
};

export const POPUP_TYPE = {
  CONFIRM: 'confirm',
  ERROR: 'error',
  MESSAGE: 'message',
};

export const POSITION_OPTIONS = [
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


export const SIZE_OPTIONS = [
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

export const FIELD_OPTIONS = [
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

export const CATEGORY_OPTIONS = [
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

export const APPLICATION_STATUS = {
  PENDING: 'Pending',
  REVIEWING: 'Reviewing',
  REJECTED: 'Rejected',
  APPROVED: 'Approved',
};

export const APPLICATION_TYPE = {
  FREELANCER: 'Freelancer',
  FULLTIME: 'Fulltime',
};

export const APPLICATION_LANGUAGE = {
  VIETNAMESE: 'Vietnamese',
  CHINESE: 'Chinese',
  JANPANESE: 'Japanese',
  ENGLISH: 'English',
};

export const REPLY_TYPE = {
  USER_NORMAL: 'USER_NORMAL',
  USER_MISC: 'USER_MISC', // MEDIA, VIDEO, IMAGE, FILES, ETC
  SYSTEM_NOTIFICATION: 'SYSTEM_NOTIFICATION',
};

export const REPLY_STATUS = {
  PENDING: 'PENDING',
  SENT: 'SENT', // MEDIA, VIDEO, IMAGE, FILES, ETC
  READ: 'READ',
};

export const PAGE_SIZE = 10;

export const SOCKET_EMIT = {
  /* events */
  NEW_MESSAGE: 'NEW_MESSAGE',
  REPLY_MESSAGE: 'REPLY_MESSAGE',
  REQUEST_AVAILABLE: 'REQUEST_AVAILABLE',
  REQUEST_CONFIRM: 'REQUEST_CONFIRM',
  REMOVE_REQUEST: 'REMOVE_REQUEST',
  // conversation room
  OTHER_JOIN_ROOM: 'OTHER_JOIN_ROOM',
  OTHER_LEFT_ROOM: 'OTHER_LEFT_ROOM',
  RECEIVE_USER_TYPING: 'RECEIVE_USER_TYPING',
  CLOSE_TICKET_NOTIFICATION: 'CLOSE_TICKET_NOTIFICATION',

  JOIN_CONVERSATION: 'JOIN_CONVERSATION',
  LEFT_CONVERSATION: 'LEFT_CONVERSATION',
  USER_TYPING: 'USER_TYPING',
};
