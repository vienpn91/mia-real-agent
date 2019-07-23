import {
  takeLatest, call, put,
  take,
} from 'redux-saga/effects';
import get from 'lodash/get';
import { getConversationByTicketId } from '../../api/ticket';
import {
  CONVERSATION_FETCH,
  actions,
} from '../../reducers/conversations';

function* fetchConversation({ payload }) {
  const { ticketId } = payload;
  try {
    const { response, error } = yield call(getConversationByTicketId, ticketId);
    if (error) throw new Error(error);
    const data = get(response, 'data', {});

    yield put(actions.fetchConversationSuccess(data));
  } catch (error) {
    console.log('[CONVERSATION SAGA] OH NO! AN ERROR', error.message);
    yield put(actions.fetchConversationFailed(error.message || error));
  }
}

function* conversationFlow() {
  yield takeLatest(CONVERSATION_FETCH, fetchConversation);
}

export default conversationFlow;
