import { fromJS } from 'immutable';

export const FETCH_DETAIL = 'profile/FETCH_DETAIL';
export const FETCH_DETAIL_SUCCESS = 'profile/FETCH_DETAIL_SUCCESS';
export const FETCH_DETAIL_FAIL = 'profile/FETCH_DETAIL_FAIL';

// action creator
const fetchDetailAction = () => ({
  type: FETCH_DETAIL,
});

const fetchDetailCompleteAction = payload => ({
  type: FETCH_DETAIL_SUCCESS,
  payload,
});

const fetchDetailFailAction = errorMessage => ({
  type: FETCH_DETAIL_FAIL,
  payload: {
    errorMessage,
  },
});

// selector
const getProfileIsFetching = ({ profile }) => profile.get('isFetching');
const getProfileFetchedProfile = ({ profile }) => profile.get('fetchProfile');

const initialState = fromJS({
  isFetching: false,
  fetchError: '',
  fetchProfile: {},
});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DETAIL:
      return state.set('isFetching', true)
        .set('fetchError', '')
        .set('fetchProfile', {});
    case FETCH_DETAIL_SUCCESS:
      return state.set('isFetching', false)
        .set('fetchProfile', action.payload);
    case FETCH_DETAIL_FAIL:
      return state.set('isFetching', false)
        .set('fetchError', action.errorMessage);
    default: return state;
  }
}

export default profileReducer;

export const actions = {
  fetchDetailAction,
  fetchDetailCompleteAction,
  fetchDetailFailAction,
};

export const selectors = {
  getProfileIsFetching,
  getProfileFetchedProfile,
};
