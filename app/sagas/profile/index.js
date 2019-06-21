import {
  takeEvery, call, put, select,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';
import { FETCH_DETAIL, actions } from '../../reducers/profile';
import { getUserId, getToken } from '../../reducers/auth';
import * as UserApi from '../../api/user';
import { configToken } from '../../api/config';
import { handleEmailCensor } from './utils';

function* fetchDetail() {
  yield configAxiosForProfile();
  const userId = yield select(getUserId);
  const { response: { data }, error } = yield call(UserApi.getUserProfile, userId);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.fetchDetailFailAction(message));
    return;
  }
  const { email } = data;
  yield put(actions.fetchDetailCompleteAction({
    ...data,
    email: handleEmailCensor(email),
  }));
}

export function* configAxiosForProfile() {
  const token = yield select(getToken);
  configToken(token);
}


function* profileFlow() {
  yield takeEvery(FETCH_DETAIL, fetchDetail);
}

export default profileFlow;
