import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  AGENTS_FIND,
  AGENT_CONFIRM,
  findAgentRequestFailed,
  findAgentRequestSuccess,
  agentConfirmSuccessAction,
  agentConfirmFailAction,
} from '../../reducers/agents';
import {
  getConversationById,
} from '../../reducers/conversations';
import { findAgent } from '../../api/ticket';
import { acceptAgent } from '../../api/agent';

export function* findAvailableAgent({ payload }) {
  const { conversationId } = payload;
  const conversation = yield select(getConversationById, conversationId);
  try {
    const { error } = yield call(findAgent, conversation.ticketId);
    if (error) {
      throw new Error(error);
    }
    yield put(findAgentRequestSuccess(conversationId));
  } catch (error) {
    const errorMsg = error.message || error;
    yield put(findAgentRequestFailed(conversationId, errorMsg));
  }
}

export function* confirmRequest({ payload }) {
  const {
    conversationId,
    ticketId,
    isConfirm,
  } = payload;
  try {
    const { error } = yield call(acceptAgent, conversationId, ticketId, isConfirm);
    if (error) {
      throw new Error(error);
    }
    yield put(agentConfirmSuccessAction());

    if (isConfirm) yield put(push(`/conversation/${conversationId}`));
  } catch (error) {
    const errorMsg = error.message || error;
    yield put(agentConfirmFailAction(errorMsg));
  }
}

function* agentFlow() {
  yield takeLatest(AGENTS_FIND, findAvailableAgent);
  yield takeLatest(AGENT_CONFIRM, confirmRequest);
}

export default agentFlow;
