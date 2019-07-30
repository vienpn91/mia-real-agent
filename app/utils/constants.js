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
  LINK: 'link',
  IMAGE: 'image',
  DATE: 'date',
  ACTIVE: 'active',
  ROLE: 'role',
  TOTAL: 'total',
  STATUS: 'status',
  ROLE_BUTTON_GROUP: 'role-button-group',
  UPPERCASE: 'uppercase',
  ARRAY: 'array',
  ACTIONS: 'actions',
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
  APPLICATION_SORT: [
    {
      title: 'Email',
      value: 'email',
    },
  ],
};


export const ROUTE_DETAIL = {
  USER_DETAIL_ROUTER: '/admin/user/:id',
  APPLICATION_DETAIL_ROUTER: '/admin/applications/:id',
  TICKET_DETAIL_ROUTER: '/admin/tickets/:id',
};
