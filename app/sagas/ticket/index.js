import {
  takeEvery, call, put, select, takeLatest,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';
import {
  actions, CREATE, GET_ALL, GET, UPDATE, REMOVE,
} from '../../reducers/ticket';
import * as TicketApi from '../../api/ticket';
import { configToken } from '../../api/config';
import { getToken } from '../../reducers/auth';
import { notification } from 'antd';

function* createTicket({ payload }) {
  yield configAxiosForTicket();
  const { error, response } = yield call(TicketApi.createTicket, payload);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.createFailAction(message));
    return;
  }

  const { data } = response;

  yield put(actions.createCompleteAction(data));
}

function* getAllTicket({ payload }) {
  yield configAxiosForTicket();
  const { response, error } = yield call(TicketApi.getAllTicket, payload);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.getAllFailAction(message));
    return;
  }

  const data = _get(response, 'data', {});
  const { result, totalRecord } = data;

  yield put(actions.getAllCompleteAction(result, totalRecord));
}

function* getTicket({ payload }) {
  yield configAxiosForTicket();
  const { ticketId, owner } = payload;
  try {
    const { response } = yield call(TicketApi.getTicket, ticketId, owner);
    const { data } = response;
    yield put(actions.getCompleteAction(data));
  } catch (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    notification.error({ message: 'Ticket not found' });
    yield put(actions.getFailAction(message));
  }
}

function* updateTicket({ payload }) {
  yield configAxiosForTicket();
  const { ticket } = payload;
  const { error } = yield call(TicketApi.updateTicket, ticket);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.updateFailAction(message));
    return;
  }
  yield put(actions.updateCompleteAction());
}

function* removeTicket({ payload }) {
  yield configAxiosForTicket();
  const { ticketId } = payload;
  const { error } = yield call(TicketApi.removeTicket, ticketId);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.removeFailAction(message));
    return;
  }
  yield put(actions.removeCompleteAction());
}

export function* configAxiosForTicket() {
  const token = yield select(getToken);
  configToken(token);
}

function* ticketFlow() {
  yield takeEvery(CREATE, createTicket);
  yield takeLatest(GET_ALL, getAllTicket);
  yield takeLatest(GET, getTicket);
  yield takeLatest(UPDATE, updateTicket);
  yield takeLatest(REMOVE, removeTicket);
}

export default ticketFlow;
