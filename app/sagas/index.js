import { all, take } from 'redux-saga/effects';
import { configAxios } from '../api/config';
import authSaga from './auth';
import { REHYDRATE_COMPLETE } from '../reducers';

export default function* rootSagas() {
  configAxios();
  yield take(REHYDRATE_COMPLETE);
  yield all([
    authSaga(),
  ]);
}
