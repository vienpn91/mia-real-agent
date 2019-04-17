import {
  call, put, select,
  takeLatest,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import { push } from 'react-router-redux';
import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';
import * as AuthApi from '../../api/auth';
import { configToken } from '../../api/config';
import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REGISTER,
  AUTH_CHANGE_PASSWORD,
  AUTH_CREATE_PASSWORD,
  AUTH_SEND_VERICATION_EMAIL,
  actions as authActions,
  getToken,
  getVerifyingEmail,
} from '../../reducers/auth';

function* login({ payload }) {
  const { email: loginEmail, password } = payload;
  const authResult = yield call(AuthApi.login, loginEmail, password);
  const response = _get(authResult, 'response', {});
  const error = _get(authResult, 'error');

  // login error
  if (error) {
    yield put(authActions.setVerifyingEmail(null));
    const message = _get(error, 'response.data.message', DEFAULT_ERROR_MESSAGE);
    return yield put(authActions.loginFail(message));
  }

  const data = _get(response, 'data', {});
  const authInfo = _pick(data, [
    'email',
    'role',
    'token',
    'userId',
    'verifiedAt',
  ]);

  // unverified account
  const { verifiedAt, email } = authInfo;
  if (!verifiedAt) {
    yield put(authActions.loginFail());
    return yield put(authActions.setVerifyingEmail(email));
  }

  return yield put(authActions.loginSuccess(authInfo));
}

function* register({ payload }) {
  const { error } = yield call(AuthApi.register, payload);

  if (error) {
    const message = _get(error, 'response.data.message', DEFAULT_ERROR_MESSAGE);

    return yield put(authActions.registerFail(message));
  }
  const { email } = payload;
  yield put(authActions.registerSucces());
  yield put(authActions.setVerifyingEmail(email));
  return yield put(push('/thank-for-registering'));
}

function* changePassword({ data }) {
  const { error } = yield call(AuthApi.changePassword, data);

  if (error) {
    const message = _get(error, 'response.data.message', DEFAULT_ERROR_MESSAGE);

    return yield put(authActions.changePasswordFail(message));
  }

  yield put(authActions.changePasswordSuccess());
  return yield put(authActions.logout());
}

function* createPassword({ data }) {
  const { error } = yield call(AuthApi.createPassword, data);

  if (error) {
    const message = _get(error, 'response.data.message', DEFAULT_ERROR_MESSAGE);
    return yield put(authActions.createPasswordFail(message));
  }

  yield put(authActions.createPasswordSuccess());
  return yield put(authActions.logout());
}

function* sendVericationEmail() {
  const verifyingEmail = yield select(getVerifyingEmail);
  const { error } = yield call(
    AuthApi.sendVericationEmail,
    verifyingEmail,
  );
  if (error) {
    const message = _get(error, 'response.data.message', DEFAULT_ERROR_MESSAGE);
    return yield put(authActions.sendVericationEmailFail(message));
  }

  return yield put(authActions.sendVericationEmailSuccess());
}

export function* configAxiosForAuthenticate() {
  const token = yield select(getToken);

  configToken(token);
}

function* authFlow() {
  yield takeLatest(AUTH_LOGIN, login);
  yield takeLatest(
    [AUTH_LOGIN_SUCCESS, AUTH_LOGOUT],
    configAxiosForAuthenticate,
  );
  yield takeLatest(AUTH_REGISTER, register);
  yield takeLatest(AUTH_CHANGE_PASSWORD, changePassword);
  yield takeLatest(AUTH_CREATE_PASSWORD, createPassword);
  yield takeLatest(AUTH_SEND_VERICATION_EMAIL, sendVericationEmail);
}

export default authFlow;
