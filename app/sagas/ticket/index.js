import {
  takeEvery, call, put, select, takeLatest,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import { notification } from 'antd';
import {
  actions, CREATE, GET_ALL, GET, UPDATE, REMOVE, ARCHIVE,
} from '../../reducers/ticket';
import * as TicketApi from '../../api/ticket';
import { configToken } from '../../api/config';
import { getToken } from '../../reducers/auth';

function* createTicket({ payload }) {
  yield configAxiosForTicket();
  const { error, response } = yield call(TicketApi.createTicket, payload);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
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
      error, 'response.data.message', error.message
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
    const { _doc } = data;
    yield put(actions.getCompleteAction(_doc));
  } catch (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    notification.error({ message });
    yield put(actions.getFailAction(message));
  }
}

function* archiveTicket({ payload }) {
  yield configAxiosForTicket();
  const { ticketId } = payload;
  try {
    const { response } = yield call(TicketApi.updateTicket, { ticketId, archived: true });
    const { data } = response;
    yield put(actions.archiveCompleteAction(data));
    notification.success({ message: 'Ticket archived' });
  } catch (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    notification.error({ message });
    yield put(actions.archiveFailAction(message));
  }
}

function* updateTicket({ payload }) {
  yield configAxiosForTicket();
  const { ticket } = payload;
  const { response, error } = yield call(TicketApi.updateTicket, ticket);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(actions.updateFailAction(message));
    return;
  }
  const { data } = response;
  yield put(actions.updateCompleteAction(data));
}

function* removeTicket({ payload }) {
  yield configAxiosForTicket();
  const { ticketId } = payload;
  const { response, error } = yield call(TicketApi.removeTicket, ticketId);
  if (error) {
    const message = _get(
      error, 'response.data.message', error.message
    );
    yield put(actions.removeFailAction(message));
    notification.error({ message });
    return;
  }
  const { data } = response;
  yield put(actions.removeCompleteAction(data));
  notification.success({ message: 'Ticket removed' });
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
  yield takeLatest(ARCHIVE, archiveTicket);
}

export default ticketFlow;
