import { fromJS } from 'immutable';
import _keyBy from 'lodash/keyBy';
import _values from 'lodash/values';
import _pick from 'lodash/pick';
import { createSelector } from 'reselect';

export const CREATE = 'ticket/CREATE';
export const CREATE_SUCCESS = 'ticket/CREATE_SUCCESS';
export const CREATE_FAIL = 'ticket/CREATE_FAIL';

export const GET_ALL = 'ticket/GET_ALL';
export const GET_ALL_SUCCESS = 'ticket/GET_ALL_SUCCESS';
export const GET_ALL_FAIL = 'ticket/GET_ALL_FAIL';

export const GET = 'ticket/GET';
export const GET_SUCCESS = 'ticket/GET_SUCCESS';
export const GET_FAIL = 'ticket/GET_FAIL';

export const UPDATE = 'ticket/UPDATE';
export const UPDATE_SUCCESS = 'ticket/UPDATE_SUCCESS';
export const UPDATE_FAIL = 'ticket/UPDATE_FAIL';

export const REMOVE = 'ticket/REMOVE';
export const REMOVE_SUCCESS = 'ticket/REMOVE_SUCCESS';
export const REMOVE_FAIL = 'ticket/REMOVE_FAIL';

// action creator

// payload: {
//   title: { type: String },
//   description: { type: String },
//   category: { type: Array[String] },
// }

const emptyMap = fromJS({});

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
const updateAction = ticket => ({
  type: UPDATE,
  payload: { ticket },
});


const updateCompleteAction = () => ({
  type: UPDATE_SUCCESS,
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


const removeCompleteAction = () => ({
  type: REMOVE_SUCCESS,
});

const removeFailAction = errorMessage => ({
  type: REMOVE_FAIL,
  payload: {
    errorMessage,
  },
});

const fetchingObj = {
  isFetching: false,
  errorMsg: '',
};

// selector
const getTicketIsCreating = ({ ticket }) => ticket.get('isCreating');
const getTicketCreateError = ({ ticket }) => ticket.get('createError');

const getTicketTotalRecord = ({ ticket }) => ticket.get('totalRecord');
const getTicketGetTicketDetail = ({ ticket }, id, owner) => ticket.getIn(['tickets', `${id}#${owner}`], emptyMap).toJS();
const getTicketsById = ({ ticket }) => ticket.get('tickets');
const getVisibleTicketIds = ({ ticket }) => ticket.get('visibleTicketIds');
const getTicketsList = createSelector(getTicketsById, getVisibleTicketIds, (ticketByIds, visibleTicketIds) => {
  const plainTicketById = ticketByIds.toJS();
  const plainVisibleTicketIds = visibleTicketIds.toJS();
  const sortTickets = plainVisibleTicketIds.map(itemId => plainTicketById[itemId]);

  return sortTickets;
});

const getFetchingContext = ({ ticket }) => ticket.get('fetching', fetchingObj).toJS();

const initialState = fromJS({
  createError: '',
  tickets: {},
  totalRecord: 0,
  visibleTicketIds: [],
  getError: '',
  ticketDetail: null,
  // processing value
  isCreating: false,
  isGetting: false,
  fetching: fetchingObj,
});

function profileReducer(state = initialState, action) {
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
        .set('getError', action.errorMessage);
    case GET_ALL:
      return state.set('fetching', fromJS({ isFetching: true, errorMsg: '' }));
    case GET_ALL_SUCCESS: {
      const { data, totalRecord } = action;
      const newTickets = state
        .get('tickets')
        .merge(fromJS(_keyBy(data, ({ ticketId, owner }) => `${ticketId}#${owner}`)));
      const visibleTicketIds = data.map(({ ticketId, owner }) => `${ticketId}#${owner}`);

      return state
        .set('visibleTicketIds', fromJS(visibleTicketIds))
        .set('tickets', newTickets)
        .set('totalRecord', totalRecord)
        .set('fetching', fromJS(fetchingObj));
    }
    case GET_ALL_FAIL:
      return state.set('fetching', fromJS({ isFetching: false, errorMsg: action.errorMsg }));
    default: return state;
  }
}

export default profileReducer;

export const actions = {
  createAction,
  createCompleteAction,
  createFailAction,

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
};

export const selectors = {
  getTicketIsCreating,
  getTicketCreateError,

  getTicketTotalRecord,
  getTicketGetTicketDetail,
  getTicketsList,
  getFetchingContext,
};
