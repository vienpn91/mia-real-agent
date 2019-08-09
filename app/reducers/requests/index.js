/* eslint-disable no-underscore-dangle */
import {
  fromJS,
} from 'immutable';
export const SAVE_REQUEST = 'requests/SAVE_REQUEST';

// action creator
const saveRequest = request => ({
  type: SAVE_REQUEST,
  payload: {
    request,
  },
});

// selector
const getRequests = ({ requests }) => requests.get('requests').toJS();

const initialState = fromJS({
  requests: {},
});

function repliesReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_REQUEST: {
      const { request } = action.payload;
      const requests = getRequests(state);
      return state
        .set('requests', { ...requests, request });
    }

    default: {
      return state;
    }
  }
}

export default repliesReducer;

export const actions = {
  saveRequest,
};

export const selectors = {
  getRequests,
};
