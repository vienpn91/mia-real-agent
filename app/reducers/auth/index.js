import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import _isEmpty from 'lodash/isEmpty';

// import action type
export const AUTH_LOGIN = 'auth/LOGIN';
export const AUTH_LOGOUT = 'auth/LOGOUT';
export const AUTH_LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const AUTH_LOGIN_FAIL = 'auth/LOGIN_FAIL';
export const AUTH_REGISTER = 'auth/REGISTER';
export const AUTH_REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
export const AUTH_REGISTER_FAIL = 'auth/REGISTER_FAIL';
export const AUTH_CHANGE_PASSWORD = 'auth/CHANGE_PASSWORD';
export const AUTH_CHANGE_PASSWORD_SUCCESS = 'auth/CHANGE_PASSWORD_SUCCESS';
export const AUTH_CHANGE_PASSWORD_FAIL = 'auth/CHANGE_PASSWORD_FAIL';
export const AUTH_CREATE_PASSWORD = 'auth/CREATE_PASSWORD';
export const AUTH_CREATE_PASSWORD_SUCCESS = 'auth/CREATE_PASSWORD_SUCCESS';
export const AUTH_CREATE_PASSWORD_FAIL = 'auth/CREATE_PASSWORD_FAIL';
export const AUTH_CLEAR_ERROR_MESSAGE = 'auth/CLEAR_ERROR_MESSAGE';
export const AUTH_SET_VERIFYING_EMAIL = 'auth/SET_VERIFYING_EMAIL';
export const AUTH_SEND_VERICATION_EMAIL = 'auth/SEND_VERICATION_EMAIL';
export const AUTH_SEND_VERICATION_EMAIL_SUCCESS = 'auth/SEND_VERICATION_EMAIL_SUCCESS';
export const AUTH_SEND_VERICATION_EMAIL_FAIL = 'auth/SEND_VERICATION_EMAIL_FAIL';

// initialState
const initialState = fromJS({
  isLoading: false,
  data: {},
  message: null,
  verication: fromJS({
    isSending: false,
    errorMessage: '',
    verifyingEmail: null,
  }),
});

// action creator
function login(email, password) {
  return {
    type: AUTH_LOGIN,
    payload: {
      email,
      password,
    },
  };
}

function loginSuccess(authInfo) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: {
      authInfo,
    },
  };
}

function loginFail(message) {
  return {
    type: AUTH_LOGIN_FAIL,
    message,
  };
}

function logout() {
  return {
    type: AUTH_LOGOUT,
  };
}

function register(payload) {
  return {
    type: AUTH_REGISTER,
    payload,
  };
}

function registerSucces() {
  return {
    type: AUTH_REGISTER_SUCCESS,
  };
}

function registerFail(message) {
  return {
    type: AUTH_REGISTER_FAIL,
    message,
  };
}

function changePassword(data) {
  return {
    type: AUTH_CHANGE_PASSWORD,
    data,
  };
}

function changePasswordSuccess() {
  return {
    type: AUTH_CHANGE_PASSWORD_SUCCESS,
  };
}

function changePasswordFail(message) {
  return {
    type: AUTH_CHANGE_PASSWORD_FAIL,
    message,
  };
}

function createPassword(data) {
  return {
    type: AUTH_CREATE_PASSWORD,
    data,
  };
}

function createPasswordSuccess() {
  return {
    type: AUTH_CREATE_PASSWORD_SUCCESS,
  };
}

function createPasswordFail(message) {
  return {
    type: AUTH_CREATE_PASSWORD_FAIL,
    message,
  };
}

function clearErrorMessage() {
  return {
    type: AUTH_CLEAR_ERROR_MESSAGE,
  };
}

function setVerifyingEmail(email) {
  return {
    type: AUTH_SET_VERIFYING_EMAIL,
    email,
  };
}

function sendVericationEmail() {
  return {
    type: AUTH_SEND_VERICATION_EMAIL,
  };
}

function sendVericationEmailSuccess() {
  return {
    type: AUTH_SEND_VERICATION_EMAIL_SUCCESS,
  };
}

function sendVericationEmailFail(errorMessage) {
  return {
    type: AUTH_SEND_VERICATION_EMAIL_FAIL,
    errorMessage,
  };
}

export const actions = {
  login,
  loginSuccess,
  loginFail,
  logout,
  register,
  registerSucces,
  registerFail,
  changePassword,
  changePasswordSuccess,
  changePasswordFail,
  createPassword,
  createPasswordSuccess,
  createPasswordFail,
  clearErrorMessage,
  setVerifyingEmail,
  sendVericationEmail,
  sendVericationEmailSuccess,
  sendVericationEmailFail,
};

// selector
const initialData = fromJS({});

export const selectAuthenticationReducer = state => state.auth;
export const getAuthenticatedData = createSelector(
  selectAuthenticationReducer,
  authState => authState.get('data', initialData).toJS(),
);
export const getUserEmail = createSelector(
  getAuthenticatedData,
  data => (data && data.email ? data.email : ''),
);
export const getToken = createSelector(
  getAuthenticatedData,
  data => (data && data.token ? data.token : ''),
);
export const getUserId = createSelector(
  getAuthenticatedData,
  data => (data && data.userId ? data.userId : ''),
);
export const selectErrorMessage = createSelector(
  selectAuthenticationReducer,
  subState => subState.get('message', ''),
);
export const checkAuthenticatedStatus = createSelector(
  selectAuthenticationReducer,
  (authentication) => {
    const auth = authentication.get('data', initialData).toJS();
    return !_isEmpty(auth) && auth.verifiedAt;
  },
);
export const getIsRegisterForm = state => selectAuthenticationReducer(state).get('isRegisterForm', false);

export const getIsLoading = state => selectAuthenticationReducer(state).get('isLoading', false);

export const getVerifyingEmail = state => selectAuthenticationReducer(state).getIn(['verication', 'verifyingEmail']);

export const getIsSendingEmail = state => selectAuthenticationReducer(state).getIn(['verication', 'isSending']);

export const getResendEmailError = state => selectAuthenticationReducer(state).getIn(['verication', 'errorMessage']);

// reducer
function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return state.set('isLoading', true).set('message', '');
    case AUTH_LOGIN_SUCCESS: {
      const { authInfo } = action.payload;
      return state.set('data', fromJS(authInfo)).set('isLoading', false);
    }
    case AUTH_LOGIN_FAIL:
      return state.set('isLoading', false).set('message', action.message);
    case AUTH_LOGOUT:
      return state.set('data', initialData);
    case AUTH_REGISTER:
      return state.set('isLoading', true);
    case AUTH_REGISTER_SUCCESS:
      return state
        .set('isLoading', false)
        .set('message', '')
        .set('isRegisterForm', false);
    case AUTH_REGISTER_FAIL:
      return state.set('isLoading', false).set('message', action.message);
    case AUTH_CHANGE_PASSWORD:
      return state.set('isLoading', true);
    case AUTH_CHANGE_PASSWORD_SUCCESS:
      return state.set('message', '').set('isLoading', false);
    case AUTH_CHANGE_PASSWORD_FAIL:
      return state.set('message', action.message).set('isLoading', false);
    case AUTH_CREATE_PASSWORD:
      return state.set('isLoading', true);
    case AUTH_CREATE_PASSWORD_SUCCESS:
      return state.set('message', '').set('isLoading', false);
    case AUTH_CREATE_PASSWORD_FAIL:
      return state.set('message', action.message).set('isLoading', false);
    case AUTH_CLEAR_ERROR_MESSAGE:
      return state.set('message', '');
    case AUTH_SET_VERIFYING_EMAIL:
      return state.setIn(['verication', 'verifyingEmail'], action.email);
    case AUTH_SEND_VERICATION_EMAIL:
      return state.setIn(['verication', 'isSending'], true);
    case AUTH_SEND_VERICATION_EMAIL_SUCCESS:
      return state.setIn(['verication', 'isSending'], false);
    case AUTH_SEND_VERICATION_EMAIL_FAIL:
      return state
        .setIn(['verication', 'isSending'], false)
        .setIn(['verication', 'errorMessage'], action.errorMessage);
    default:
      return state;
  }
}

export default authReducer;
