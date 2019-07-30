/* eslint-disable no-underscore-dangle */
import {
  fromJS, Set as ISet,
} from 'immutable';

export const AGENTS_FIND = 'agents/AGENTS_FIND';
export const AGENTS_FIND_SUCCESS = 'agents/AGENTS_FIND_SUCCESS';
export const AGENTS_FIND_FAILED = 'agents/AGENTS_FIND_FAILED';

// action creator

export const findAgentRequest = conversationId => ({
  type: AGENTS_FIND,
  payload: {
    conversationId,
  },
});

export const findAgentRequestSuccess = conversationId => ({
  type: AGENTS_FIND_SUCCESS,
  payload: {
    conversationId,
  },
});

export const findAgentRequestFailed = (conversationId, error) => ({
  type: AGENTS_FIND_FAILED,
  payload: {
    conversationId,
    error,
  },
});

// selector
export const getErrorMessage = ({ agents }, conversationId) => {
  if (!conversationId) return '';
  const error = agents.getIn(['error', conversationId]);
  if (!error) return '';

  return error;
};

export const isFindingAgent = ({ agents }, conversationId) => {
  if (!conversationId) return false;
  const isRequestingList = agents.get('isRequestingList');
  return isRequestingList.has(conversationId);
};

const initialState = fromJS({
  isRequestingList: new ISet(),
  error: {},
});

function agentsReducer(state = initialState, action) {
  switch (action.type) {
    case AGENTS_FIND: {
      const { conversationId } = action.payload;
      const isRequestingList = state.get('isRequestingList').add(conversationId);
      const error = state.get('error').delete(conversationId);

      return state
        .set('isRequestingList', isRequestingList)
        .set('error', error);
    }

    case AGENTS_FIND_SUCCESS: {
      const { conversationId } = action.payload;
      const isRequestingList = state.get('isRequestingList').remove(conversationId);

      return state
        .set('isRequestingList', isRequestingList);
    }

    case AGENTS_FIND_FAILED: {
      const { error: errorMsg, conversationId } = action.payload;
      const isRequestingList = state.get('isRequestingList').remove(conversationId);
      const error = state.get('error').set(conversationId, errorMsg);

      return state
        .set('isRequestingList', isRequestingList)
        .set('error', error);
    }

    default: {
      return state;
    }
  }
}

export default agentsReducer;

export const actions = {
  findAgentRequest,
  findAgentRequestSuccess,
  findAgentRequestFailed,
};

export const selectors = {
  getErrorMessage,
  isFindingAgent,
};
