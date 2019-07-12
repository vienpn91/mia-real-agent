import {
  takeEvery, call, put, select,
} from 'redux-saga/effects';
import get from 'lodash/get';
import * as ConversationApi from '../../api/conversation';
import {
  AUTH_LOGIN_SUCCESS,
  getToken,
} from '../../reducers/auth';
import { actions } from '../../reducers/conversations';
import { configToken } from '../../api/config';

export function* configAxiosForTicket() {
  const token = yield select(getToken);
  configToken(token);
}

function* fetchConversation() {
  yield call(configAxiosForTicket);
  yield put(actions.fetchConversation());
  try {
    const { response, error } = yield call(ConversationApi.getAllConversation);
    if (error) throw new Error(error);
    const data = get(response, 'data', {});
    const { result = [], total = 0 } = data;

    yield put(actions.fetchConversationSuccess(result, total));
  } catch (error) {
    console.log('[CONVERSATION SAGA] OH NO! AN ERROR', error);
    yield put(actions.fetchConversationFailed(error.message || error));
  }
}
function* conversationFlow() {
  yield takeEvery([
    AUTH_LOGIN_SUCCESS,
    'persist/REHYDRATE',
  ], fetchConversation);
}

export default conversationFlow;
