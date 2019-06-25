import { fromJS } from 'immutable';

export const CREATE = 'ticket/CREATE';
export const CREATE_SUCCESS = 'ticket/CREATE_SUCCESS';
export const CREATE_FAIL = 'ticket/CREATE_FAIL';

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

// selector
const getTicketIsCreating = ({ ticket }) => ticket.get('isCreating');
const getTicketCreateError = ({ ticket }) => ticket.get('createError');

const initialState = fromJS({
  isCreating: false,
  createError: '',
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

    default: return state;
  }
}

export default profileReducer;

export const actions = {
  createAction,
  createCompleteAction,
  createFailAction,
};

export const selectors = {
  getTicketIsCreating,
  getTicketCreateError,
};
