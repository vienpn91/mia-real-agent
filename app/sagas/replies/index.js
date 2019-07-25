import {
  takeEvery, select,
} from 'redux-saga/effects';
import { REPLIES_SEND_MESSAGE } from '../../reducers/replies';
import { getCurrentConveration } from '../../reducers/conversations';
import { getUserId } from '../../reducers/auth';
import { emitReply } from '../socketio';

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
  emitReply(userId, to, conversationId, message);
}

function* repliesSaga() {
  yield takeEvery(REPLIES_SEND_MESSAGE, sendReplyMessage);
}

export default repliesSaga;
