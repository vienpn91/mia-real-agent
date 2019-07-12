/* eslint-disable no-underscore-dangle */
import { fromJS } from 'immutable';

export const CHAT_LOG_FETCH = 'chatlog/CHAT_LOG_FETCH';
export const CHAT_LOG_FETCH_SUCCESS = 'chatlog/CHAT_LOG_FETCH_SUCCESS';
export const CHAT_LOG_FETCH_FAILED = 'chatlog/CHAT_LOG_FETCH_FAILED';


// action creator
export const fetchChatLog = () => ({
  type: CHAT_LOG_FETCH,
});

export const fetchChatLogSuccess = (conversationId, chatLog, total) => ({
  type: CHAT_LOG_FETCH_SUCCESS,
  payload: {
    conversationId,
    chatLog,
    total,
  },
});

export const fetchChatLogFailed = error => ({
  type: CHAT_LOG_FETCH_FAILED,
  payload: {
    error,
  },
});

// selector
export const getTotalChatLog = ({ chatlog }) => chatlog.get('total');
export const getChatLogByConversationId = ({ chatlog }, conversationId) => {
  const chatLog = chatlog
    .get('byId')
    .get(conversationId);
  if (!chatLog) return [];
  return chatLog.toJS();
};
export const getErrorMessage = ({ chatlog }) => chatlog.get('errorMsg');
export const isFetchingList = ({ chatlog }) => chatlog.get('isFetching');

const initialState = fromJS({
  isFetching: false,
  byId: {},
  allIds: [],
  total: 0,
  errorMsg: '',
});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case CHAT_LOG_FETCH: {
      return state
        .set('isFetching', true)
        .set('errorMsg', '');
    }

    case CHAT_LOG_FETCH_SUCCESS: {
      const {
        conversationId,
        chatLog, total,
      } = action.payload;
      const allIds = state.get('allIds');
      allIds.push(conversationId);

      return state
        .set('allIds', allIds)
        .set('isFetching', false)
        .set('total', total)
        .setIn(['byId', conversationId], chatLog);
    }

    case CHAT_LOG_FETCH_FAILED: {
      const { error } = action.payload;
      return state
        .set('isFetching', false)
        .set('errorMsg', error);
    }

    default: {
      return state;
    }
  }
}

export default profileReducer;

export const actions = {
  fetchChatLog,
  fetchChatLogSuccess,
  fetchChatLogFailed,
};

export const selectors = {
  getErrorMessage,
  isFetchingList,
  getTotalChatLog,
};
