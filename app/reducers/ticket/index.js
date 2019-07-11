import { fromJS } from 'immutable';
import _keyBy from 'lodash/keyBy';
import _get from 'lodash/get';

export const CREATE = 'ticket/CREATE';
export const CREATE_SUCCESS = 'ticket/CREATE_SUCCESS';
export const CREATE_FAIL = 'ticket/CREATE_FAIL';

export const GET_ALL = 'ticket/GET_ALL';
export const GET_ALL_SUCCESS = 'ticket/GET_ALL_SUCCESS';
export const GET_ALL_FAIL = 'ticket/GET_ALL_FAIL';

export const GET = 'ticket/GET';
export const GET_SUCCESS = 'ticket/GET_SUCCESS';
export const GET_FAIL = 'ticket/GET_FAIL';

export const ARCHIVE = 'ticket/ARCHIVE';
export const ARCHIVE_SUCCESS = 'ticket/ARCHIVE_SUCCESS';
export const ARCHIVE_FAIL = 'ticket/GET_FAIL';

export const UPDATE = 'ticket/UPDATE';
export const UPDATE_SUCCESS = 'ticket/UPDATE_SUCCESS';
export const UPDATE_FAIL = 'ticket/UPDATE_FAIL';

export const REMOVE = 'ticket/REMOVE';
export const REMOVE_SUCCESS = 'ticket/REMOVE_SUCCESS';
export const REMOVE_FAIL = 'ticket/REMOVE_FAIL';

export const TICKET_SORTING = 'ticket/TICKET_SORTING';
export const TICKET_FILTER = 'ticket/TICKET_FILTER';
export const TICKET_FETCH = 'ticket/TICKET_FETCH';

export const TICKET_CHANGE_PAGE = 'ticket/TICKET_CHANGE_PAGE';

export const TICKET_ADMIN_GET_ALL = 'ticket/ADMIN_GET_ALL';

// action creator

const createAction = payload => ({
  type: CREATE,
  payload,
});


const createCompleteAction = payload => ({
  type: CREATE_SUCCESS,
  payload,
});

const createFailAction = errorMessage => ({
  type: CREATE_FAIL,
  payload: {
    errorMessage,
  },
});

const ticketAdminGetAll = payload => ({
  type: TICKET_ADMIN_GET_ALL,
  payload,
});

const getAllAction = payload => ({
  type: GET_ALL,
  payload,
});


const getAllCompleteAction = (data, totalRecord) => ({
  type: GET_ALL_SUCCESS,
  data,
  totalRecord,
});

const getAllFailAction = errorMsg => ({
  type: GET_ALL_FAIL,
  errorMsg,
});

const getAction = (ticketId, owner) => ({
  type: GET,
  payload: {
    ticketId,
    owner,
  },
});

const getCompleteAction = ticket => ({
  type: GET_SUCCESS,
  payload: {
    ticket,
  },
});

const getFailAction = errorMessage => ({
  type: GET_FAIL,
  payload: {
    errorMessage,
  },
});

const archiveAction = ticketId => ({
  type: ARCHIVE,
  payload: {
    ticketId,
  },
});

const archiveCompleteAction = ticket => ({
  type: ARCHIVE_SUCCESS,
  payload: ticket,
});

const archiveFailAction = errorMessage => ({
  type: ARCHIVE_FAIL,
  payload: {
    errorMessage,
  },
});

const updateAction = ticket => ({
  type: UPDATE,
  payload: { ticket },
});


const updateCompleteAction = ticket => ({
  type: UPDATE_SUCCESS,
  payload: ticket,
});

const updateFailAction = errorMessage => ({
  type: UPDATE_FAIL,
  payload: {
    errorMessage,
  },
});

const removeAction = ticketId => ({
  type: REMOVE,
  payload: {
    ticketId,
  },
});

const removeCompleteAction = ticket => ({
  type: REMOVE_SUCCESS,
  payload: ticket,
});

const removeFailAction = errorMessage => ({
  type: REMOVE_FAIL,
  payload: {
    errorMessage,
  },
});

const sortTicket = payload => ({
  type: TICKET_SORTING,
  payload,
});

const filterTicket = payload => ({
  type: TICKET_FILTER,
  payload,
});

const changePage = (pageIndex, sizePerPage) => ({
  type: TICKET_CHANGE_PAGE,
  pageIndex,
  sizePerPage,
});

export const fetchingObj = {
  isFetching: false,
  errorMsg: '',
};

export const initialState = fromJS({
  // error value
  createError: '',
  updateError: '',
  archiveError: '',
  removeError: '',
  getError: '',

  tickets: {},
  totalRecord: 0,
  pagination: fromJS({
    selectedPage: 1,
    sizePerPage: 20,
  }),
  visibleTicketIds: [],
  sorting: fromJS({
    field: 'createdAt',
    order: -1,
  }),

  ticketDetail: null,
  // processing value
  isCreating: false,
  isUpdating: false,
  isArchiving: false,
  isRemoving: false,
  isGetting: false,
  fetching: fetchingObj,
});

function ticketReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE:
      return state.set('isCreating', true)
        .set('createError', '');
    case CREATE_SUCCESS: {
      const { payload } = action;
      const { ticketId, owner } = payload;
      const visibleTicketIds = state.get('visibleTicketIds').toJS();
      const newVisibleTicketIds = [`${ticketId}#${owner}`, ...visibleTicketIds];
      return state
        .set('isCreating', false)
        .setIn(['tickets', `${ticketId}#${owner}`], fromJS(payload))
        .set('visibleTicketIds', fromJS(newVisibleTicketIds));
    }
    case CREATE_FAIL:
      return state.set('isCreating', false)
        .set('createError', action.errorMessage);

    case GET:
      return state.set('isGetting', true)
        .set('getError', '');
    case GET_SUCCESS: {
      const { ticket } = action.payload;
      const { ticketId, owner } = ticket;
      return state.set('isGetting', false)
        .setIn(['tickets', `${ticketId}#${owner}`], fromJS(ticket));
    }
    case GET_FAIL:
      return state.set('isGetting', false)
        .set('getError', action.payload.errorMessage);

    case ARCHIVE:
      return state.set('isArchiving', true)
        .set('archiveError', '');

    case ARCHIVE_SUCCESS: {
      const { payload } = action;
      const { ticketId, owner } = payload;
      const visibleTicketIds = state.get('visibleTicketIds').toJS();
      const newVisibleTicketIds = visibleTicketIds.filter(id => id !== `${ticketId}#${owner}`);
      return state
        .set('isArchiving', false)
        .removeIn(['tickets', `${ticketId}#${owner}`])
        .set('visibleTicketIds', fromJS(newVisibleTicketIds));
    }

    case ARCHIVE_FAIL:
      return state.set('isArchiving', false)
        .set('archiveError', action.payload.errorMessage);

    case UPDATE:
      return state.set('isUpdating', true)
        .set('updateError', '');

    case UPDATE_SUCCESS: {
      const { payload } = action;
      const { ticketId, owner } = payload;
      return state.set('isUpdating', false)
        .setIn(['tickets', `${ticketId}#${owner}`], fromJS(payload));
    }
    case UPDATE_FAIL:
      return state.set('isUpdating', false)
        .set('updateError', action.payload.errorMessage);

    case REMOVE:
      return state.set('isRemoving', true)
        .set('removeError', '');

    case REMOVE_SUCCESS: {
      const { payload } = action;
      const { ticketId, owner } = payload;
      const visibleTicketIds = state.get('visibleTicketIds').toJS();
      const newVisibleTicketIds = visibleTicketIds.filter(id => id !== `${ticketId}#${owner}`);
      return state
        .set('isRemoving', false)
        .removeIn(['tickets', `${ticketId}#${owner}`])
        .set('visibleTicketIds', fromJS(newVisibleTicketIds));
    }
    case REMOVE_FAIL:
      return state.set('isRemoving', false)
        .set('removeError', action.payload.errorMessage);

    case TICKET_ADMIN_GET_ALL:
    case GET_ALL:
      return state.set('fetching', fromJS({ isFetching: true, errorMsg: '' }));
    case GET_ALL_SUCCESS: {
      const { data, totalRecord } = action;
      const newTickets = state
        .get('tickets')
        .merge(fromJS(_keyBy(data, ({ ticketId, owner }) => {
          const ownerId = _get(owner, '_id', owner); // for admin site, owner is object
          return `${ticketId}#${ownerId}`;
        })));
      const visibleTicketIds = data.map(({ ticketId, owner }) => {
        const ownerId = _get(owner, '_id', owner); // for admin site, owner is object
        return `${ticketId}#${ownerId}`;
      });

      return state
        .set('visibleTicketIds', fromJS(visibleTicketIds))
        .set('tickets', newTickets)
        .set('totalRecord', totalRecord)
        .set('fetching', fromJS(fetchingObj));
    }
    case GET_ALL_FAIL:
      return state.set('fetching', fromJS({ isFetching: false, errorMsg: action.errorMsg }));
    case TICKET_CHANGE_PAGE:
      return state
        .set('fetching', fromJS({ isFetching: true, errorMsg: '' }))
        .setIn(['pagination', 'selectedPage'], action.pageIndex);
    default: return state;
  }
}

export default ticketReducer;

export const actions = {
  createAction,
  createCompleteAction,
  createFailAction,

  ticketAdminGetAll,
  getAllAction,
  getAllCompleteAction,
  getAllFailAction,

  getAction,
  getCompleteAction,
  getFailAction,

  updateAction,
  updateCompleteAction,
  updateFailAction,

  removeAction,
  removeCompleteAction,
  removeFailAction,

  sortTicket,
  filterTicket,

  changePage,
  archiveAction,
  archiveCompleteAction,
  archiveFailAction,
};
