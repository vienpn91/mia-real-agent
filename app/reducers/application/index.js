import { fromJS } from 'immutable';

export const SUBMIT = 'application/SUBMIT';
export const SUBMIT_SUCCESS = 'application/SUBMIT_SUCCESS';
export const SUBMIT_FAIL = 'application/SUBMIT_FAIL';

// action creator
const submitAction = application => ({
  type: SUBMIT,
  payload: {
    application,
  },
});

const submitCompleteAction = payload => ({
  type: SUBMIT_SUCCESS,
  payload,
});

const submitFailAction = errorMessage => ({
  type: SUBMIT_FAIL,
  payload: {
    errorMessage,
  },
});

// selector
const getApplicationIsSubmitting = ({ application }) => application.get('isSubmitting');
const getApplicationSubmitError = ({ application }) => application.get('submitError');

const initialState = fromJS({
  isSubmitting: false,
  submitError: '',
});

function applicationReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT:
      return state.set('isSubmitting', true)
        .set('submitError', '');
    case SUBMIT_SUCCESS:
      return state.set('isSubmitting', false);
    case SUBMIT_FAIL:
      return state.set('isSubmitting', false)
        .set('submitError', action.errorMessage);

    default: return state;
  }
}

export default applicationReducer;

export const actions = {
  submitAction,
  submitCompleteAction,
  submitFailAction,
};

export const selectors = {
  getApplicationIsSubmitting,
  getApplicationSubmitError,
};
