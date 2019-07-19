import {
  takeEvery, call, put, select, takeLatest,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import _assign from 'lodash/assign';
import _pick from 'lodash/pick';
import _pickBy from 'lodash/pickBy';
import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';
import {
  SUBMIT, actions, APPLICATION_CHANGE_PAGE,
  APPLICATION_ADMIN_GET_ALL, APPLICATION_SORTING,
  APPLICATION_APPROVE, APPLICATION_REJECT, APPLICATION_REVIEW,
} from 'reducers/application';
import { getSkipLimit } from 'utils/func-utils';
import { getSelectedPage, getSizePerPage, reselectSorting } from 'selectors/application';
import { getToken } from 'reducers/auth';
import * as ApplicationApi from '../../api/application';
import { configToken } from '../../api/config';

function* submitApplication({ payload }) {
  const { application } = payload;
  const { error, response } = yield call(ApplicationApi.createApplication, application);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.submitFailAction(message));
    return;
  }

  const { data } = response;
  yield put(actions.submitCompleteAction(data));
}

function* queryTickets(action) {
  const applicationPayload = {};
  const { type } = action;
  switch (type) {
    case APPLICATION_SORTING:
      {
        const {
          payload: { field, order },
        } = action;
        _assign(applicationPayload, { sort: { [field]: order } });
      }
      break;
    case APPLICATION_CHANGE_PAGE:
      {
        const { pageIndex, sizePerPage } = action;
        const { skip, limit } = getSkipLimit(pageIndex, sizePerPage);
        _assign(applicationPayload, { skip, limit });
      }
      break;
    default:
      break;
  }

  yield put(actions.applicationAdminGetAll(applicationPayload));
}

function* adminGetAllApplication({ payload }) {
  yield configAxiosForApplication();
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

  const { response, error } = yield call(ApplicationApi.adminGetAllApplication, params);
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


function* approveApplication(action) {
  yield configAxiosForApplication();
  const { applicationId } = action;
  const { error } = yield call(ApplicationApi.approveApplication, applicationId);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.applicationApproveFail(message));
    return;
  }
  yield put(actions.applicationApproveComplete());
}

function* rejectApplication(action) {
  yield configAxiosForApplication();
  const { applicationId } = action;
  const { error } = yield call(ApplicationApi.rejectApplication, applicationId);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.applicationRejectFail(message));
    return;
  }
  yield put(actions.applicationRejectComplete());
}

function* reviewApplication(action) {
  yield configAxiosForApplication();
  const { applicationId } = action;
  const { error } = yield call(ApplicationApi.reviewApplication, applicationId);
  if (error) {
    const message = _get(
      error, 'response.data.message', DEFAULT_ERROR_MESSAGE
    );
    yield put(actions.applicationReviewFail(message));
    return;
  }
  yield put(actions.applicationReviewComplete());
}

export function* configAxiosForApplication() {
  const token = yield select(getToken);
  configToken(token);
}

function* ticketFlow() {
  yield takeEvery(SUBMIT, submitApplication);
  yield takeLatest([APPLICATION_CHANGE_PAGE, APPLICATION_SORTING], queryTickets);
  yield takeLatest(APPLICATION_ADMIN_GET_ALL, adminGetAllApplication);
  yield takeEvery(APPLICATION_APPROVE, approveApplication);
  yield takeEvery(APPLICATION_REJECT, rejectApplication);
  yield takeEvery(APPLICATION_REVIEW, reviewApplication);
}

export default ticketFlow;
