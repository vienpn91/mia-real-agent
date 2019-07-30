import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';
import { notification } from 'antd';
import {
  actions, INSERT_MESSAGE,
  FIND_AGENT, ACCEPT_AGENT, REQUEST_CONFIRM,
} from '../../reducers/chat';
import * as AgentApi from '../../api/agent';

export function* sendMessage({ payload }) {
  const {
    message,
  } = payload;
  console.log(message);
  // emitReply(from, to, conversation, message);
}

export function* findAvailableAgent({ payload }) {
  const { ticketId } = payload;
  const { response, error } = yield call(AgentApi.findAvailableAgent, ticketId);
  if (error) {
    const errorMessage = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.findAgentFailAction(errorMessage));
    return;
  }
  const { data } = response;
  const { agent } = data;
  if (!agent) {
    notification.error({ message: 'No Agent found' });
  } else {
    notification.success({ message: 'Found Agent' });
  }
  yield put(actions.findAgentCompleteAction(data));
}

export function* acceptAgent({ payload }) {
  const { agentId } = payload;
  const { error } = yield call(AgentApi.acceptAgent, agentId);
  if (error) {
    const errorMessage = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.acceptAgentFailAction(errorMessage));
    return;
  }
  yield put(actions.acceptAgentCompleteAction());
}

export function* confirmRequest({ payload }) {
  const {
    agentId, ticketId: _id, isConfirm,
    redirectData,
  } = payload;
  const { error } = yield call(AgentApi.acceptAgent, agentId, _id, isConfirm);
  if (error) {
    const errorMessage = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.requestConfirmFailAction(errorMessage));
    return;
  }
  yield put(actions.requestConfirmCompleteAction({ ...redirectData, isConfirm }));
}

function* chatFlow() {
  // yield takeLatest(INSERT_MESSAGE, sendMessage);
  // yield takeLatest(FIND_AGENT, findAvailableAgent);
  // yield takeLatest(ACCEPT_AGENT, acceptAgent);
  yield takeLatest(REQUEST_CONFIRM, confirmRequest);
}

export default chatFlow;
