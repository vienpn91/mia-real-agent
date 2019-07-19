import { fromJS } from 'immutable';
import _keyBy from 'lodash/keyBy';

export const SUBMIT = 'application/SUBMIT';
export const SUBMIT_SUCCESS = 'application/SUBMIT_SUCCESS';
export const SUBMIT_FAIL = 'application/SUBMIT_FAIL';

export const APPLICATION_SORTING = 'application/APPLICATION_SORTING';
export const APPLICATION_FILTER = 'application/APPLICATION_FILTER';
export const APPLICATION_FETCH = 'application/APPLICATION_FETCH';

export const APPLICATION_CHANGE_PAGE = 'application/APPLICATION_CHANGE_PAGE';

export const APPLICATION_ADMIN_GET_ALL = 'application/ADMIN_GET_ALL';

export const GET_ALL = 'application/GET_ALL';
export const GET_ALL_SUCCESS = 'application/GET_ALL_SUCCESS';
export const GET_ALL_FAIL = 'application/GET_ALL_FAIL';

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

const applicationAdminGetAll = payload => ({
  type: APPLICATION_ADMIN_GET_ALL,
  payload,
});

const getAllAction = payload => ({
  type: GET_ALL,
  payload,
});

const getAllCompleteAction = (data, totalRecord) => ({
  type: GET_ALL_SUCCESS,
  data,
  totalRecord,
});

const getAllFailAction = errorMsg => ({
  type: GET_ALL_FAIL,
  errorMsg,
});


const sortApplication = payload => ({
  type: APPLICATION_SORTING,
  payload,
});

const filterApplication = payload => ({
  type: APPLICATION_FILTER,
  payload,
});

const changePage = (pageIndex, sizePerPage) => ({
  type: APPLICATION_CHANGE_PAGE,
  pageIndex,
  sizePerPage,
});


// selector
const getApplicationIsSubmitting = ({ application }) => application.get('isSubmitting');
const getApplicationSubmitError = ({ application }) => application.get('submitError');

export const fetchingObj = {
  isFetching: false,
  errorMsg: '',
};

const initialState = fromJS({
  isSubmitting: false,
  submitError: '',

  applications: {},
  totalRecord: 0,
  pagination: fromJS({
    selectedPage: 1,
    sizePerPage: 20,
  }),
  visibleApplicationIds: [],
  sorting: fromJS({
    field: 'createdAt',
    order: -1,
  }),
  fetching: fetchingObj,
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

    case APPLICATION_ADMIN_GET_ALL:
    case GET_ALL:
      return state.set('fetching', fromJS({ isFetching: true, errorMsg: '' }));
    case GET_ALL_SUCCESS: {
      const { data, totalRecord } = action;
      const newTickets = state
        .get('applications')
        .merge(fromJS(_keyBy(data, ({ _id }) => _id)));

      const visibleTicketIds = data.map(({ _id }) => _id);

      return state
        .set('visibleApplicationIds', fromJS(visibleTicketIds))
        .set('applications', newTickets)
        .set('totalRecord', totalRecord)
        .set('fetching', fromJS(fetchingObj));
    }
    case GET_ALL_FAIL:
      return state.set('fetching', fromJS({ isFetching: false, errorMsg: action.errorMsg }));
    case APPLICATION_CHANGE_PAGE:
      return state
        .set('fetching', fromJS({ isFetching: true, errorMsg: '' }))
        .setIn(['pagination', 'selectedPage'], action.pageIndex);
    default: return state;
  }
}

export default applicationReducer;

export const actions = {
  submitAction,
  submitCompleteAction,
  submitFailAction,

  applicationAdminGetAll,
  sortApplication,
  filterApplication,
  changePage,
  getAllAction,
  getAllCompleteAction,
  getAllFailAction,
};

export const selectors = {
  getApplicationIsSubmitting,
  getApplicationSubmitError,
};
