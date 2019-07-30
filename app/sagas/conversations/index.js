import {
  takeLatest, call, put, take, select,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { getConversation, getConversationMessage } from '../../api/conversation';
import {
  CONVERSATION_FETCH,
  CONVERSATION_FETCH_FAILED,
  CONVERSATION_FETCH_SUCCESS,
  actions,
  CONVERSATION_SET_CURRENT,
  getConverationById,
  selectConversationSuccess,
  fetchConversation as fetchConversationAction,
} from '../../reducers/conversations';
import {
  TICKET_GET_ALL_SUCCESS,
} from '../../reducers/ticket';
import {
  REPLIES_FETCH,
  fetchReplyMessagesSuccess,
  fetchReplyMessagesFailed,
} from '../../reducers/replies';

function* fetchConversationMessages({ payload }) {
  const { conversationId } = payload;
  if (!conversationId) return;
  try {
    const { response, error } = yield call(getConversationMessage, conversationId);
    if (error) throw new Error(error);
    const data = _get(response, 'data', {});

    yield put(fetchReplyMessagesSuccess(conversationId, data));
  } catch (error) {
    console.log('[CONVERSATION SAGA - fetchConversationMessages] ERROR:', error.message);
    yield put(fetchReplyMessagesFailed(conversationId, error.message || error));
  }
}

function* setCurrentConversation({ payload }) {
  const { conversationId } = payload;
  const conversation = yield select(getConverationById, conversationId);
  if (!conversation) {
    yield put(fetchConversationAction(conversationId));
    const { payload: fetchData } = yield take(CONVERSATION_FETCH_SUCCESS);
    const { conversation: fetchedConversation } = fetchData;
    yield put(selectConversationSuccess(fetchedConversation));
  } else {
    yield put(selectConversationSuccess(conversation));
  }
}

function* fetchConversation({ payload }) {
  const { conversationId } = payload;
  try {
    const { response, error } = yield call(getConversation, conversationId);
    if (error) throw new Error(error);
    const data = _get(response, 'data', {});

    yield put(actions.fetchConversationSuccess(data));
  } catch (error) {
    console.log('[CONVERSATION SAGA - fetchConversation] ERROR:', error.message);
    yield put(actions.fetchConversationFailed(error.message || error));
  }
}

function* fetchAllConversationBasedOnTicket({ data }) {
  for (let i = 0; i < data.length; i += 1) {
    const ticket = data[i];
    const { conversationId } = ticket;
    if (!_isEmpty(conversationId)) {
      yield put(actions.fetchConversation(conversationId));
      yield take([
        CONVERSATION_FETCH_FAILED,
        CONVERSATION_FETCH_SUCCESS,
      ]);
    }
  }
}

function* conversationFlow() {
  yield takeLatest(CONVERSATION_FETCH, fetchConversation);
  yield takeLatest(CONVERSATION_SET_CURRENT, setCurrentConversation);
  yield takeLatest(TICKET_GET_ALL_SUCCESS, fetchAllConversationBasedOnTicket);
  yield takeLatest(REPLIES_FETCH, fetchConversationMessages);
}

export default conversationFlow;
