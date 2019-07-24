import {
  takeEvery, call, put, select,
} from 'redux-saga/effects';
import _get from 'lodash/get';

import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';
import {
  actions, DASHBOARD_GET_TICKET_ACTIVITY, DASHBOARD_GET_APPLICATION_SUMMARY,
} from 'reducers/admin';
import { getToken } from 'reducers/auth';
import * as TicketApi from '../../api/ticket';
import * as ApplicationApi from '../../api/application';
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

function* getDashboardApplicationSummary() {
  yield configAxiosForAdmin();
  const { response, error } = yield call(ApplicationApi.getApplicationSummary);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.dashboardGetApplicationSummaryFail(message));
    return;
  }
  const { data } = response;
  yield put(actions.dashboardGetApplicationSummarySuccess(data));
}

export function* configAxiosForAdmin() {
  const token = yield select(getToken);
  configToken(token);
}

function* ticketFlow() {
  yield takeEvery(DASHBOARD_GET_TICKET_ACTIVITY, getDashboardTicketActivity);
  yield takeEvery(DASHBOARD_GET_APPLICATION_SUMMARY, getDashboardApplicationSummary);
}

export default ticketFlow;
