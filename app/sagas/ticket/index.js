import {
  takeEvery, call, put, select,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';
import {
  actions, CREATE,
} from '../../reducers/ticket';
import { getToken } from '../../reducers/auth';
import * as TicketApi from '../../api/ticket';
import { configToken } from '../../api/config';

function* createTicket({ payload }) {
  yield configAxiosForProfile();
  const { error } = yield call(TicketApi.createTicket, payload);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.createFailAction(message));
  }
  yield put(actions.createCompleteAction());
}

export function* configAxiosForProfile() {
  const token = yield select(getToken);
  configToken(token);
}


function* ticketFlow() {
  yield takeEvery(CREATE, createTicket);
}

export default ticketFlow;
