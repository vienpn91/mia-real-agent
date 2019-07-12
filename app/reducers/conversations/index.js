/* eslint-disable no-underscore-dangle */
import { fromJS } from 'immutable';

export const CONVERSATION_FETCH = 'conversations/CONVERSATION_FETCH';
export const CONVERSATION_FETCH_SUCCESS = 'conversations/CONVERSATION_FETCH_SUCCESS';
export const CONVERSATION_FETCH_FAILED = 'conversations/CONVERSATION_FETCH_FAILED';


// action creator
export const fetchConversation = () => ({
  type: CONVERSATION_FETCH,
});

export const fetchConversationSuccess = (conversationList, total) => ({
  type: CONVERSATION_FETCH_SUCCESS,
  payload: {
    conversationList,
    total,
  },
});

export const fetchConversationFailed = error => ({
  type: CONVERSATION_FETCH_FAILED,
  payload: {
    error,
  },
});

// selector

const initialState = fromJS({
  isFetchingAll: false,
  isFetchingSingleItem: false,
  byId: {},
  allIds: [],
  total: 0,
  errorMsg: '',
});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case CONVERSATION_FETCH: {
      return state.set('isFetchingAll', true).set('isFetchingSingleItem', false);
    }
    case CONVERSATION_FETCH_SUCCESS: {
      const { conversationList, total } = action.payload;
      let newState = state;

      for (let i = 0; i < conversationList.length; i += 1) {
        const conversation = conversationList[i];
        const allIds = newState.get('allIds');

        newState = newState.setIn(['byId', conversation._id], conversation);
        allIds.push(conversation._id);
        newState = newState.set('allIds', allIds);
      }

      return newState
        .set('isFetchingAll', false)
        .set('isFetchingSingleItem', false)
        .set('total', total);
    }
    case CONVERSATION_FETCH_FAILED: {
      const { error } = action.payload;
      return state.set('isFetchingAll', false).set('isFetchingSingleItem', false).set('errorMsg', error);
    }
    default: {
      return state;
    }
  }
}

export default profileReducer;

export const actions = {
};

export const selectors = {
};
