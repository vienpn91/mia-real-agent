import {
  takeEvery, select,
  call, put,
} from 'redux-saga/effects';
import get from 'lodash/get';
import {
  REPLIES_SEND_MESSAGE,
  sendReplyMessageSuccess,
  sendReplyMessageFailed,
} from '../../reducers/replies';
import { getCurrentConveration } from '../../reducers/conversations';
import { getUserId } from '../../reducers/auth';
import { sendReplyMessage as sendReplyMessageAPI } from '../../api/reply';

function* sendReplyMessage({ payload }) {
  const {
    conversationId,
    message,
    localMessageId,
  } = payload;
  const { owner, members } = yield select(getCurrentConveration);
  const userId = yield select(getUserId);
  const to = userId !== owner ? owner : members[0];
  // from, to, conversation, message
  try {
    const { response, error } = yield call(sendReplyMessageAPI, userId, to, conversationId, message);
    if (error) throw new Error(error);
    const { reply } = get(response, 'data', {});

    yield put(sendReplyMessageSuccess(conversationId, reply, localMessageId));
  } catch (error) {
    console.log('[REPLY SAGA] ERROR: ', error.message || error);
    yield put(sendReplyMessageFailed(conversationId, error.message || error, localMessageId));
  }
}

function* repliesSaga() {
  yield takeEvery(REPLIES_SEND_MESSAGE, sendReplyMessage);
}

export default repliesSaga;
