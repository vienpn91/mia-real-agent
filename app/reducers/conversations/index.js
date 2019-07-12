/* eslint-disable no-underscore-dangle */
import { fromJS } from 'immutable';

export const CONVERSATION_FETCH = 'conversations/CONVERSATION_FETCH';
export const CONVERSATION_FETCH_SUCCESS = 'conversations/CONVERSATION_FETCH_SUCCESS';
export const CONVERSATION_FETCH_FAILED = 'conversations/CONVERSATION_FETCH_FAILED';
export const CONVERSATION_GET_DETAIL = 'conversations/CONVERSATION_GET_DETAIL';
export const CONVERSATION_GET_DETAIL_SUCCESS = 'conversations/CONVERSATION_GET_DETAIL_SUCCESS';
export const CONVERSATION_GET_DETAIL_FAILED = 'conversations/CONVERSATION_GET_DETAIL_FAILED';
export const CONVERSATION_SET_CURRENT = 'conversations/CONVERSATION_SET_CURRENT';


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

export const getConversationDetail = () => ({
  type: CONVERSATION_GET_DETAIL,
});

export const getConversationDetailSuccess = conversation => ({
  type: CONVERSATION_GET_DETAIL_SUCCESS,
  payload: {
    conversation,
  },
});

export const getConversationDetailFailed = error => ({
  type: CONVERSATION_GET_DETAIL_FAILED,
  payload: {
    error,
  },
});

export const selectConversation = id => ({
  type: CONVERSATION_SET_CURRENT,
  payload: {
    id,
  },
});

// selector
export const getConverationList = ({ conversations }) => {
  const byId = conversations.get('byId').toJS();
  const allIds = conversations.get('allIds').toJS();
  return allIds.map(id => byId[id]);
};
export const getCurrentConveration = ({ conversations }) => conversations.get('currentConversation');
export const getCurrentConverationId = ({ conversations }) => (conversations.get('currentConversation') || {})._id;
export const getTotalConverations = ({ conversations }) => conversations.get('total');
export const getErrorMessage = ({ conversations }) => conversations.get('errorMsg');
export const isFetchingList = ({ conversations }) => conversations.get('isFetchingAll');
export const isFetchingSingleItem = ({ conversations }) => conversations.get('isFetchingSingleItem');

const initialState = fromJS({
  isFetchingAll: false,
  isFetchingSingleItem: false,
  byId: {},
  allIds: [],
  currentConversation: null,
  total: 0,
  errorMsg: '',
});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case CONVERSATION_FETCH: {
      return state.set('isFetchingAll', true).set('isFetchingSingleItem', false).set('errorMsg', '');
    }

    case CONVERSATION_FETCH_SUCCESS: {
      const { conversationList, total } = action.payload;
      let newState = state;
      let allIds = newState.get('allIds');

      for (let i = 0; i < conversationList.length; i += 1) {
        const conversation = conversationList[i];

        newState = newState.setIn(['byId', conversation._id], conversation);
        allIds = allIds.push(conversation._id);
      }

      return newState
        .set('isFetchingAll', false)
        .set('isFetchingSingleItem', false)
        .set('allIds', allIds)
        .set('total', total);
    }

    case CONVERSATION_GET_DETAIL_FAILED:
    case CONVERSATION_FETCH_FAILED: {
      const { error } = action.payload;
      return state.set('isFetchingAll', false).set('isFetchingSingleItem', false).set('errorMsg', error);
    }

    case CONVERSATION_GET_DETAIL: {
      return state
        .set('isFetchingSingleItem', true)
        .set('isFetchingSingleItem', false)
        .set('errorMsg', '');
    }

    case CONVERSATION_SET_CURRENT: {
      const { id } = action.payload;
      const conversation = state.get('byId').get(id);
      return state.set('currentConversation', conversation);
    }

    case CONVERSATION_GET_DETAIL_SUCCESS: {
      const { conversation } = action.payload;
      const { _id: id } = conversation;
      const allIds = state.get('allIds').push(id);

      return state
        .setIn(['byId', id], conversation)
        .set('allIds', allIds)
        .set('total', state.get('total') + 1);
    }

    default: {
      return state;
    }
  }
}

export default profileReducer;

export const actions = {
  fetchConversation,
  fetchConversationSuccess,
  fetchConversationFailed,
  selectConversation,
};

export const selectors = {
  getCurrentConveration,
  getTotalConverations,
  getErrorMessage,
  isFetchingList,
  isFetchingSingleItem,
};
