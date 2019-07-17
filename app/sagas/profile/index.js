import {
  takeEvery, call, put, select,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';
import { notification } from 'antd';
import {
  FETCH_DETAIL, actions, CHECK_PASSWORD,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
} from '../../reducers/profile';
import {
  getUserId, getToken,
  updateToken,
} from '../../reducers/auth';
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

function* checkPassword({ payload }) {
  yield configAxiosForProfile();
  const { password } = payload;
  const userId = yield select(getUserId);
  const { response, error } = yield call(UserApi.checkPassword, userId, password);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.checkPasswordFailAction(message));
  }
  const { data } = response;
  const { confirmed } = data;
  yield put(actions.checkPasswordCompleteAction(confirmed));
}

function* updateProfile({ payload }) {
  yield configAxiosForProfile();
  const userId = yield select(getUserId);
  const { profile } = payload;
  const { response, error } = yield call(UserApi.updateUserProfile, userId, profile);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.updateProfileFailAction(message));
  }
  const { data } = response;
  yield put(actions.updateProfileCompleteAction(data));
}

function* changePassword({ payload }) {
  yield configAxiosForProfile();
  try {
    const userId = yield select(getUserId);
    const { currentPassword, newPassword } = payload;
    const { response } = yield call(UserApi.changePassword, userId, currentPassword, newPassword);
    const { data } = response;
    const { token } = data;
    yield put(actions.changePasswordCompleteAction());
    yield put(updateToken(token));
  } catch (error) {
    yield put(actions.changePasswordFailAction(error));
  }
}

export function* configAxiosForProfile() {
  const token = yield select(getToken);
  configToken(token);
}


function* profileFlow() {
  yield takeEvery(FETCH_DETAIL, fetchDetail);
  yield takeEvery(UPDATE_PROFILE, updateProfile);
  yield takeEvery(CHECK_PASSWORD, checkPassword);
  yield takeEvery(CHANGE_PASSWORD, changePassword);
}

export default profileFlow;
