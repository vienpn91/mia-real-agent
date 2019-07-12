import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';
import { notification } from 'antd';
import {
  actions, GET_CHAT, INSERT_MESSAGE, UPDATE_CHAT,
  FIND_AGENT, ACCEPT_AGENT, REQUEST_CONFIRM, selectors,
} from '../../reducers/chat';
import * as ChatApi from '../../api/chat';
import * as AgentApi from '../../api/agent';
import { configToken } from '../../api/config';
import { getToken } from '../../reducers/auth';
import { combineChat } from './utils';

export function* configAxiosForChat() {
  const token = yield select(getToken);
  configToken(token);
}

export function* getChat({ payload }) {
  yield configAxiosForChat();
  const { ticketId, agentId } = payload;
  const { response, error } = yield call(ChatApi.getChatByTicketAndAgent, ticketId, agentId);
  if (error) {
    const errorMessage = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.getChatFailAction(errorMessage));
    return;
  }
  const { data } = response;
  const { messages } = data;
  yield put(actions.getChatCompleteAction({ ...data, messages: [] }));
}

export function* updateChat() {
  yield configAxiosForChat();
  const { _id } = yield select(selectors.getChatData);
  const { response, error } = yield call(ChatApi.getChat, _id);
  if (error) {
    const errorMessage = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.updateChatFailAction(errorMessage));
    return;
  }
  const { data } = response;
  const { messages } = data;
  yield put(actions.updateChatCompleteAction({ ...data, messages: combineChat(messages) }));
}

export function* sendMessage({ payload }) {
  yield configAxiosForChat();
  const { message } = payload;
  const { _id } = yield select(selectors.getChatData);
  const { error } = yield call(ChatApi.sendMessage, _id, message);
  if (error) {
    const errorMessage = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.insertMessageFailAction(errorMessage));
    return;
  }
  yield put(actions.insertMessageCompleteAction());
}

export function* findAvailableAgent({ payload }) {
  yield configAxiosForChat();
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
  yield configAxiosForChat();
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
  yield configAxiosForChat();
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
  yield takeLatest(GET_CHAT, getChat);
  yield takeLatest(UPDATE_CHAT, updateChat);
  yield takeLatest(INSERT_MESSAGE, sendMessage);
  yield takeLatest(FIND_AGENT, findAvailableAgent);
  yield takeLatest(ACCEPT_AGENT, acceptAgent);
  yield takeLatest(REQUEST_CONFIRM, confirmRequest);
}

export default chatFlow;
