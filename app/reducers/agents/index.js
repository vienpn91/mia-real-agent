/* eslint-disable no-underscore-dangle */
import {
  fromJS, Set as ISet,
} from 'immutable';

export const AGENTS_FIND = 'agents/AGENTS_FIND';
export const AGENTS_FIND_SUCCESS = 'agents/AGENTS_FIND_SUCCESS';
export const AGENTS_FIND_FAILED = 'agents/AGENTS_FIND_FAILED';

export const AGENT_NEW_REQUEST = 'chat/AGENT_NEW_REQUEST';

export const AGENT_CONFIRM = 'chat/AGENT_CONFIRM';
export const AGENT_CONFIRM_SUCCESS = 'chat/AGENT_CONFIRM_SUCCESS';
export const AGENT_CONFIRM_FAIL = 'chat/AGENT_CONFIRM_FAIL';

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

export const agentNewRequest = data => ({
  type: AGENT_NEW_REQUEST,
  payload: {
    data,
  },
});

export const agentConfirmAction = (agentId, conversationId, isConfirm, redirectData) => ({
  type: AGENT_CONFIRM,
  payload: {
    agentId,
    conversationId,
    isConfirm,
    redirectData,
  },
});

// payload: {
//   ticketId,
//   owner,
//   isConfirm,
// }
export const agentConfirmCompleteAction = (conversationId, payload) => ({
  type: AGENT_CONFIRM_SUCCESS,
  payload: {
    ...payload,
    conversationId,
  },
});

export const agentConfirmFailAction = (conversationId, error) => ({
  type: AGENT_CONFIRM_FAIL,
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

export const isWaitingForComfirm = ({ agents }) => agents.get('isWaitingForComfirm');
export const isSendingConfirmation = ({ agents }) => agents.get('isSendingConfirmation');

// initial state
const initialState = fromJS({
  isRequestingList: new ISet(),
  error: {},
  isWaitingForComfirm: false,
  isSendingConfirmation: false,
  confirmationError: '',
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

    case AGENT_NEW_REQUEST: {
      return state.set('isWaitingForComfirm', true);
    }

    case AGENT_CONFIRM: {
      return state.set('isSendingConfirmation', true);
    }

    case AGENT_CONFIRM_SUCCESS: {
      return state.set('isSendingConfirmation', false);
    }

    case AGENT_CONFIRM_FAIL: {
      const { error } = action.payload;
      return state
        .set('isSendingConfirmation', false)
        .set('confirmationError', error);
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
  agentConfirmAction,
  agentConfirmCompleteAction,
  agentConfirmFailAction,
};

export const selectors = {
  getErrorMessage,
  isFindingAgent,
};
