import {
  takeEvery, call, put, select, takeLatest,
} from 'redux-saga/effects';
// lodash
import _get from 'lodash/get';
import _assign from 'lodash/assign';
import _pick from 'lodash/pick';
import _pickBy from 'lodash/pickBy';
// utils
import { getSkipLimit } from 'utils/func-utils';

import { notification } from 'antd';
import { getSelectedPage, getSizePerPage, reselectSorting } from 'selectors/ticket';
import {
  actions, CREATE, GET_ALL, GET, UPDATE, REMOVE, ARCHIVE,
  TICKET_ADMIN_GET_ALL, TICKET_SORTING, TICKET_CHANGE_PAGE, TICKET_FETCH_SINGLE,
} from '../../reducers/ticket';
import * as TicketApi from '../../api/ticket';
import { configToken } from '../../api/config';
import { getToken } from '../../reducers/auth';

function* queryTickets(action) {
  const ticketPayload = {};
  const { type } = action;
  switch (type) {
    case TICKET_SORTING:
      {
        const {
          payload: { field, order },
        } = action;
        _assign(ticketPayload, { sort: { [field]: order } });
      }
      break;
    case TICKET_CHANGE_PAGE:
      {
        const { pageIndex, sizePerPage } = action;
        const { skip, limit } = getSkipLimit(pageIndex, sizePerPage);
        _assign(ticketPayload, { skip, limit });
      }
      break;
    default:
      break;
  }

  yield put(actions.ticketAdminGetAll(ticketPayload));
}

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

function* adminGetAllTicket({ payload }) {
  yield configAxiosForTicket();
  const selectedPage = yield select(getSelectedPage);
  const sizePerPage = yield select(getSizePerPage);
  const sorting = yield select(reselectSorting);

  const { skip, limit } = getSkipLimit(selectedPage, sizePerPage);
  const { field, order } = sorting;
  const sort = { [field]: order };

  const actionParam = _pickBy(
    _pick(payload, ['skip', 'limit', 'sort']),
    v => v !== null && v !== undefined,
  );

  const params = {
    sort,
    skip,
    limit,
    ...actionParam,
  };

  const { response, error } = yield call(TicketApi.adminGetAllTicket, params);
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

function* ticketFetchSingle({ id }) {
  yield configAxiosForTicket();
  const { response } = yield call(TicketApi.get, id);
  const error = _get(response, 'error');
  const data = _get(response, 'data', {});
  if (error) {
    const errMsg = _get(error, 'response.data.message', error.message);
    yield put(actions.fetchTicketSingleFail(id, errMsg));
    notification.error({ message: errMsg });
  } else {
    yield put(actions.fetchTicketSingleSuccess(data));
  }
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
  yield takeLatest([TICKET_CHANGE_PAGE, TICKET_SORTING], queryTickets);
  yield takeLatest(TICKET_ADMIN_GET_ALL, adminGetAllTicket);
  yield takeLatest(TICKET_FETCH_SINGLE, ticketFetchSingle);
}

export default ticketFlow;
