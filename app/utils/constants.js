export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const DEFAULT_ERROR_MESSAGE = 'Something has wrong';
export const DATE_TIME_FORMAT = {
  DATE: 'MMMM Do YYYY',
  TIME: 'H:mm',
  DATE_TIME: 'MMM Do YYYY, H:mm',
  DATE_RANGE: 'YYYY-MM-DD',
};


export const COLUMN_TYPE = {
  TEXT: 'text',
  IMAGE: 'image',
  DATE: 'date',
  ACTIVE: 'active',
  ROLE: 'role',
  TOTAL: 'total',
  STATUS: 'status',
  ROLE_BUTTON_GROUP: 'role-button-group',
  UPPERCASE: 'uppercase',
};

export const FILTER = {
  TICKET_FILTER: [
    {
      title: 'All SKU',
      value: 'all',
      query: {},
    },
    {
      title: 'Low Stock SKU',
      value: 'low-stock',
      query: { quantity: { $lt: 10 } },
    },
  ],
};

export const SORT = {
  TICKET_SORT: [
    {
      title: 'Created Time',
      value: 'createdAt',
    },
    {
      title: 'Category',
      value: 'category',
    },
    {
      title: 'Title',
      value: 'title',
    },
  ],
  USER_SORT: [
    {
      title: 'Username',
      value: 'username',
    },
    {
      title: 'Email',
      value: 'email',
    },
    {
      title: 'Role',
      value: 'role',
    },
  ],
};
