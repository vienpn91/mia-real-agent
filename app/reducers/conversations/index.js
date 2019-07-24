/* eslint-disable no-underscore-dangle */
import { fromJS, Set as ISet } from 'immutable';

export const CONVERSATION_FETCH = 'conversations/CONVERSATION_FETCH';
export const CONVERSATION_FETCH_SUCCESS = 'conversations/CONVERSATION_FETCH_SUCCESS';
export const CONVERSATION_FETCH_FAILED = 'conversations/CONVERSATION_FETCH_FAILED';

export const CONVERSATION_GET_DETAIL = 'conversations/CONVERSATION_GET_DETAIL';
export const CONVERSATION_GET_DETAIL_SUCCESS = 'conversations/CONVERSATION_GET_DETAIL_SUCCESS';
export const CONVERSATION_GET_DETAIL_FAILED = 'conversations/CONVERSATION_GET_DETAIL_FAILED';

export const CONVERSATION_SET_CURRENT = 'conversations/CONVERSATION_SET_CURRENT';


// action creator

// FETCH SINGLE CONVERSATION

export const fetchConversation = conversationId => ({
  type: CONVERSATION_FETCH,
  payload: {
    conversationId,
  },
});

export const fetchConversationSuccess = conversation => ({
  type: CONVERSATION_FETCH_SUCCESS,
  payload: {
    conversation,
  },
});

export const fetchConversationFailed = error => ({
  type: CONVERSATION_FETCH_FAILED,
  payload: {
    error,
  },
});

// FETCH CONVERSATION DETAIL

export const getConversationDetail = id => ({
  type: CONVERSATION_GET_DETAIL,
  payload: {
    id,
  },
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

// SELECT CONVERSATION

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
export const getConversationListByTicketList = ({ conversations }, ticketIdList) => {
  const ticketIdSet = new Set(ticketIdList);
  const byId = conversations.get('byId').toJS();

  return conversations
    .get('allIds')
    .toJS()
    .filter(id => ticketIdSet.has(byId[id].ticketId))
    .reduce((acc, id) => {
      acc[byId[id].ticketId] = byId[id];
      return acc;
    }, {});
};

const initialState = fromJS({
  isFetchingAll: false,
  isFetchingSingleItem: false,
  byId: {},
  allIds: new ISet(),
  currentConversation: null,
  total: 0,
  errorMsg: '',
});

function conversationReducer(state = initialState, action) {
  switch (action.type) {
    case CONVERSATION_FETCH: {
      return state.set('isFetchingAll', true).set('isFetchingSingleItem', false).set('errorMsg', '');
    }

    case CONVERSATION_FETCH_SUCCESS: {
      const { conversation } = action.payload;
      let newState = state;
      let allIds = newState.get('allIds');

      allIds = allIds.add(conversation._id);
      newState = newState.setIn(['byId', conversation._id], conversation);

      return newState
        .set('isFetchingAll', false)
        .set('isFetchingSingleItem', false)
        .set('allIds', allIds)
        .set('total', newState.get('total') + 1);
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
      const allIds = state.get('allIds').add(id);

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

export default conversationReducer;

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
