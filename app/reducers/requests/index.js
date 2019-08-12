/* eslint-disable no-underscore-dangle */
import _keyBy from 'lodash/keyBy';
import {
  fromJS, Set as ISet,
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
export const getRequestList = ({ requests }) => {
  const byId = requests.get('byId').toJS();
  const allIds = requests.get('allIds').toJS();
  return allIds.map(id => byId[id]);
};

const list = [
  { ticketId: 1, title: 'cc', description: 'ccc' },
  { ticketId: 2, title: 'cc', description: 'ccc' },
  { ticketId: 3, title: 'cc', description: 'ccc' },
  { ticketId: 4, title: 'cc', description: 'ccc' },
  { ticketId: 5, title: 'cc', description: 'ccc' },
];

const initialState = fromJS({
  byId: _keyBy(list, 'ticketId'),
  allIds: new ISet(['1', '2', '3', '4', '5']),
  total: 0,
});

function repliesReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_REQUEST: {
      const { request } = action.payload;
      const { _id } = request;
      const allIds = state.get('allIds');
      const total = state.get('total');
      return state
        .setIn(['byId', _id], request)
        .set('allIds', allIds.add(_id))
        .set('total', total + 1);
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
  getRequestList,
};
