import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';
import { notification } from 'antd';
import {
  actions, GET_CHAT, INSERT_MESSAGE, UPDATE_CHAT, FIND_AGENT, ACCEPT_AGENT, REQUEST_CONFIRM,
} from '../../reducers/chat';
import * as ChatApi from '../../api/chat';
import * as UserApi from '../../api/user';
import { configToken } from '../../api/config';
import { getToken } from '../../reducers/auth';

export function* configAxiosForChat() {
  const token = yield select(getToken);
  configToken(token);
}

export function* getChat() {
  yield configAxiosForChat();
  const { response, error } = yield call(ChatApi.getChat, '5d159d5936d1f80cb1d52436');
  if (error) {
    const errorMessage = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.getChatFailAction(errorMessage));
    return;
  }
  const { data } = response;
  yield put(actions.getChatCompleteAction(data));
}

export function* updateChat() {
  yield configAxiosForChat();
  const { response, error } = yield call(ChatApi.getChat, '5d159d5936d1f80cb1d52436');
  if (error) {
    const errorMessage = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.updateChatFailAction(errorMessage));
    return;
  }
  const { data } = response;
  yield put(actions.updateChatCompleteAction(data));
}

export function* sendMessage({ payload }) {
  yield configAxiosForChat();
  const { chatId, message } = payload;
  const { error } = yield call(ChatApi.sendMessage, '5d159d5936d1f80cb1d52436', message);
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
  const { response, error } = yield call(UserApi.findAvailableAgent, ticketId);
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
  const { error } = yield call(UserApi.acceptAgent, agentId);
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
  const { agentId, ticketId, isConfirm } = payload;
  const { error } = yield call(UserApi.acceptAgent, agentId, ticketId, isConfirm);
  if (error) {
    const errorMessage = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.requestConfirmFailAction(errorMessage));
    return;
  }
  yield put(actions.requestConfirmCompleteAction());
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
