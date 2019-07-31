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

export const findAgentRequest = (conversationId, isConfirm) => ({
  type: AGENTS_FIND,
  payload: {
    conversationId,
    isConfirm,
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

export const agentConfirmAction = (conversationId, ticketId, isConfirm) => ({
  type: AGENT_CONFIRM,
  payload: {
    conversationId,
    ticketId,
    isConfirm,
  },
});

// payload: {
//   ticketId,
//   owner,
//   isConfirm,
// }
export const agentConfirmSuccessAction = () => ({
  type: AGENT_CONFIRM_SUCCESS,
  payload: {
  },
});

export const agentConfirmFailAction = error => ({
  type: AGENT_CONFIRM_FAIL,
  payload: {
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
export const getRequestData = ({ agents }) => agents.get('requestData');

// initial state
const initialState = fromJS({
  isRequestingList: new ISet(),
  error: {},
  isWaitingForComfirm: false,
  isSendingConfirmation: false,
  confirmationError: '',
  requestData: null,
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
      const { data } = action.payload;

      return state
        .set('isWaitingForComfirm', true)
        .set('requestData', data);
    }

    case AGENT_CONFIRM: {
      return state
        .set('isSendingConfirmation', true);
    }

    case AGENT_CONFIRM_SUCCESS: {
      return state
        .set('isSendingConfirmation', false)
        .set('isWaitingForComfirm', false);
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
  agentConfirmSuccessAction,
  agentConfirmFailAction,
};

export const selectors = {
  getErrorMessage,
  isFindingAgent,
};
