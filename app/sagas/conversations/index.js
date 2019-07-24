import {
  takeLatest, call, put, take,
} from 'redux-saga/effects';
import get from 'lodash/get';
import { getConversation, getConversationMessage } from '../../api/conversation';
import {
  CONVERSATION_FETCH,
  CONVERSATION_FETCH_FAILED,
  CONVERSATION_FETCH_SUCCESS,
  actions,
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
    const data = get(response, 'data', {});

    console.log(data);

    yield put(fetchReplyMessagesSuccess(conversationId, data));
  } catch (error) {
    console.log('[CONVERSATION SAGA - fetchConversationMessages] ERROR:', error.message);
    yield put(fetchReplyMessagesFailed(conversationId, error.message || error));
  }
}

function* fetchConversation({ payload }) {
  const { conversationId } = payload;
  try {
    const { response, error } = yield call(getConversation, conversationId);
    if (error) throw new Error(error);
    const data = get(response, 'data', {});

    yield put(actions.fetchConversationSuccess(data));
  } catch (error) {
    console.log('[CONVERSATION SAGA - fetchConversation] ERROR:', error.message);
    yield put(actions.fetchConversationFailed(error.message || error));
  }
}

function* fetchAllConversationBasedOnTicket({ data }) {
  for (let i = 0; i < data.length; i += 1) {
    const ticket = data[i];
    yield put(actions.fetchConversation(ticket.conversationId));
    yield take([
      CONVERSATION_FETCH_FAILED,
      CONVERSATION_FETCH_SUCCESS,
    ]);
  }
}

function* conversationFlow() {
  yield takeLatest(CONVERSATION_FETCH, fetchConversation);
  yield takeLatest(TICKET_GET_ALL_SUCCESS, fetchAllConversationBasedOnTicket);
  yield takeLatest(REPLIES_FETCH, fetchConversationMessages);
}

export default conversationFlow;
