import {
  takeEvery, call, put,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';
import * as ApplicationApi from '../../api/application';
import { SUBMIT, actions } from '../../reducers/application';

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
function* ticketFlow() {
  yield takeEvery(SUBMIT, submitApplication);
}

export default ticketFlow;
