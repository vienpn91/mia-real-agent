import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import {
  AGENTS_FIND,
  AGENT_CONFIRM,
  findAgentRequestFailed,
  findAgentRequestSuccess,
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
    agentId, ticketId: _id, isConfirm,
    redirectData,
  } = payload;
  const { error } = yield call(acceptAgent, agentId, _id, isConfirm);
  // if (error) {
  //   const errorMessage = _get(
  //     error, 'response.data.message', DEFAULT_ERROR_MESSAGE
  //   );
  //   yield put(actions.requestConfirmFailAction(errorMessage));
  //   return;
  // }
  // yield put(actions.requestConfirmCompleteAction({ ...redirectData, isConfirm }));
}

function* agentFlow() {
  yield takeLatest(AGENTS_FIND, findAvailableAgent);
  yield takeLatest(AGENT_CONFIRM, confirmRequest);
}

export default agentFlow;
