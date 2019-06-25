import { all, take, put } from 'redux-saga/effects';
import { configAxios } from '../api/config';
import { REHYDRATE_COMPLETE, CLEAR_TRANSACTION } from '../reducers';
import authSaga from './auth';
import socketioSaga from './socketio';
import profileSaga from './profile';
import ticketSaga from './ticket';

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
  ]);
}
