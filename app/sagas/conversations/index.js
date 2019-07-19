import {
  takeLatest, call, put,
  take,
} from 'redux-saga/effects';
import get from 'lodash/get';
import { getConversationByTicketId } from '../../api/ticket';
import {
  CONVERSATION_FETCH,
  CONVERSATION_FETCH_FAILED,
  CONVERSATION_FETCH_SUCCESS,
  actions,
} from '../../reducers/conversations';
import {
  TICKET_GET_ALL_SUCCESS,
} from '../../reducers/ticket';

function* fetchConversation({ payload }) {
  const { ticketId } = payload;
  try {
    const { response, error } = yield call(getConversationByTicketId, ticketId);
    if (error) throw new Error(error);
    const data = get(response, 'data', {});
    const { result = [], total = 0 } = data;

    console.log(data);

    yield put(actions.fetchConversationSuccess(result, total));
  } catch (error) {
    console.log('[CONVERSATION SAGA] OH NO! AN ERROR', error);
    yield put(actions.fetchConversationFailed(error.message || error));
  }
}

function* fetchAllConversations({
  data: ticketList,
}) {
  for (let i = 0; i < ticketList.length; i += 1) {
    const currentTicket = ticketList[i];
    const { _id: ticketId } = currentTicket;

    yield put(actions.fetchConversation(ticketId));
    yield take([
      CONVERSATION_FETCH_FAILED,
      CONVERSATION_FETCH_SUCCESS,
    ]);
  }
}

function* conversationFlow() {
  yield takeLatest(TICKET_GET_ALL_SUCCESS, fetchAllConversations);
  yield takeLatest(CONVERSATION_FETCH, fetchConversation);
}

export default conversationFlow;
