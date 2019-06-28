import { fromJS } from 'immutable';

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
const createAction = payload => ({
  type: CREATE,
  payload,
});


const createCompleteAction = () => ({
  type: CREATE_SUCCESS,
});

const createFailAction = errorMessage => ({
  type: CREATE_FAIL,
  payload: {
    errorMessage,
  },
});

const getAllAction = () => ({
  type: GET_ALL,
});


const getAllCompleteAction = payload => ({
  type: GET_ALL_SUCCESS,
  payload,
});

const getAllFailAction = errorMessage => ({
  type: GET_ALL_FAIL,
  payload: {
    errorMessage,
  },
});

const getAction = ticketId => ({
  type: GET,
  payload: {
    ticketId,
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

// selector
const getTicketIsCreating = ({ ticket }) => ticket.get('isCreating');
const getTicketCreateError = ({ ticket }) => ticket.get('createError');

const getTicketGetTicketDetail = ({ ticket }) => ticket.get('ticketDetail');

const initialState = fromJS({
  isCreating: false,
  createError: '',

  isGetting: false,
  getError: '',
  ticketDetail: null,
});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE:
      return state.set('isCreating', true)
        .set('createError', '');
    case CREATE_SUCCESS:
      return state.set('isCreating', false);
    case CREATE_FAIL:
      return state.set('isCreating', false)
        .set('createError', action.errorMessage);

    case GET:
      return state.set('isGetting', true)
        .set('ticketDetail', null)
        .set('getError', '');
    case GET_SUCCESS:
      return state.set('isGetting', false)
        .set('ticketDetail', action.payload.ticket);
    case GET_FAIL:
      return state.set('isGetting', false)
        .set('getError', action.errorMessage);

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

  getTicketGetTicketDetail,
};
