import {
  takeEvery, call, put, select, takeLatest,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';
import {
  actions, GET_CHAT, INSERT_MESSAGE,
} from '../../reducers/chat';
import * as ChatApi from '../../api/chat';
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

function* chatFlow() {
  yield takeLatest(GET_CHAT, getChat);
  yield takeLatest(INSERT_MESSAGE, sendMessage);
}

export default chatFlow;
