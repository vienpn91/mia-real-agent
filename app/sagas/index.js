import { all, put, take } from 'redux-saga/effects';
import { configAxios } from '../api/config';
import { CLEAR_TRANSACTION, REHYDRATE_COMPLETE } from '../reducers';
import authSaga from './auth';
import socketioSaga from './socketio';
import profileSaga from './profile';
import ticketSaga from './ticket';
import chatSaga from './chat';
import userSaga from './user';
import adminSaga from './admin';
import applicationSaga from './application';
import conversationSaga from './conversations';
import repliesSaga from './replies';
import agentsSaga from './agents';

export default function* rootSagas() {
  configAxios();
  yield all([
    put({
      type: CLEAR_TRANSACTION,
    }),
    take(REHYDRATE_COMPLETE),
  ]);

  yield all([
    authSaga(),
    socketioSaga(),
    profileSaga(),
    ticketSaga(),
    chatSaga(),
    userSaga(),
    applicationSaga(),
    adminSaga(),
    conversationSaga(),
    repliesSaga(),
    agentsSaga(),
  ]);
}
