/* eslint-disable no-underscore-dangle */
import { fromJS, Set as ISet, List } from 'immutable';

export const REPLIES_FETCH = 'replies/REPLIES_FETCH';
export const REPLIES_FETCH_SUCCESS = 'replies/REPLIES_FETCH_SUCCESS';
export const REPLIES_FETCH_FAILED = 'replies/REPLIES_FETCH_FAILED';


// action creator
export const fetchReplyMessages = conversationId => ({
  type: REPLIES_FETCH,
  payload: {
    conversationId,
  },
});

export const fetchReplyMessagesSuccess = (conversationId, replies, total) => ({
  type: REPLIES_FETCH_SUCCESS,
  payload: {
    conversationId,
    replies,
    total,
  },
});

export const fetchReplyMessagesFailed = (conversationId, error) => ({
  type: REPLIES_FETCH_FAILED,
  payload: {
    conversationId,
    error,
  },
});

// selector
export const getTotalReplyMessages = ({ replies }) => replies.get('total');
export const getReplyMessagesByConversationId = ({ replies }, conversationId) => {
  const replyMessages = replies
    .getIn(['byId', conversationId]);
  if (!replyMessages) return [];
  return replyMessages.toJS();
};
export const getErrorMessage = ({ replies }, conversationId) => replies.getIn(['error', conversationId]);
export const isFetchingReplies = ({ replies }, conversationId) => replies.get('isFetching').toObject()[conversationId];

const initialState = fromJS({
  isFetching: new ISet(),
  byId: {},
  allIds: new ISet(),
  total: 0,
  error: {},
});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case REPLIES_FETCH: {
      const { conversationId } = action.payload;
      const isFetching = state.get('isFetching').add(conversationId);
      const error = state.get('error').delete(conversationId);

      return state
        .set('isFetching', isFetching)
        .set('error', error);
    }

    case REPLIES_FETCH_SUCCESS: {
      const {
        conversationId,
        replies, total,
      } = action.payload;
      const allIds = state.get('allIds').add(conversationId);
      const isFetching = state.get('isFetching').delete(conversationId);
      let currentReplies = state.getIn(['byId', conversationId]);
      if (!currentReplies) {
        currentReplies = new List(replies);
      } else {
        currentReplies = currentReplies.push(...replies);
      }

      return state
        .set('isFetching', isFetching)
        .set('allIds', allIds)
        .set('total', total)
        .setIn(['byId', conversationId], currentReplies);
    }

    case REPLIES_FETCH_FAILED: {
      const { error: errorMsg, conversationId } = action.payload;
      const isFetching = state.get('isFetching').delete(conversationId);
      const error = state.setIn(['error', conversationId], errorMsg);

      return state
        .set('isFetching', isFetching)
        .set('error', error);
    }

    default: {
      return state;
    }
  }
}

export default profileReducer;

export const actions = {
  fetchReplyMessages,
  fetchReplyMessagesSuccess,
  fetchReplyMessagesFailed,
};

export const selectors = {
  getErrorMessage,
  isFetchingReplies,
  getTotalReplyMessages,
};
