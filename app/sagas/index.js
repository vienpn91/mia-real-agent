import { all, put } from 'redux-saga/effects';
import { configAxios } from '../api/config';
import { CLEAR_TRANSACTION } from '../reducers';
import authSaga from './auth';
import socketioSaga from './socketio';
import profileSaga from './profile';
import ticketSaga from './ticket';
import chatSaga from './chat';
import userSaga from './user';

export default function* rootSagas() {
  configAxios();
  yield put({
    type: CLEAR_TRANSACTION,
  });
  yield all([
    authSaga(),
    socketioSaga(),
    profileSaga(),
    ticketSaga(),
    chatSaga(),
    userSaga(),
  ]);
}
