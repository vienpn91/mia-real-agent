import {
  takeEvery, call, put, select,
} from 'redux-saga/effects';
import _get from 'lodash/get';

import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';
import { actions, DASHBOARD_GET_TICKET_ACTIVITY } from 'reducers/admin';
import { getToken } from 'reducers/auth';
import * as TicketApi from '../../api/ticket';
import { configToken } from '../../api/config';

function* getDashboardTicketActivity() {
  yield configAxiosForAdmin();
  const { response, error } = yield call(TicketApi.getActivity);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.dashboardGetTicketActivityFail(message));
    return;
  }
  const { data } = response;
  yield put(actions.dashboardGetTicketActivitySuccess(data));
}

export function* configAxiosForAdmin() {
  const token = yield select(getToken);
  configToken(token);
}

function* ticketFlow() {
  yield takeEvery(DASHBOARD_GET_TICKET_ACTIVITY, getDashboardTicketActivity);
}

export default ticketFlow;
