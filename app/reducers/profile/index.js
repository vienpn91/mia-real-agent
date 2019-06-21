import { fromJS } from 'immutable';

export const FETCH_DETAIL = 'profile/FETCH_DETAIL';
export const FETCH_DETAIL_SUCCESS = 'profile/FETCH_DETAIL_SUCCESS';
export const FETCH_DETAIL_FAIL = 'profile/FETCH_DETAIL_FAIL';

// action creator
const fetchDetailAction = () => ({
  type: FETCH_DETAIL,
});

// payload: {
//   username: { type: String },
//   email: { type: String },
//   role: { type: String },
//   profile: {
//     // profile for individual customer
//     firstName: { type: String },
//     lastName: { type: String },
//     position: { type: String }, // position in company
//     dateOfBirth: { type: Date },
//     // profile for business customer
//     companySize: { type: String }, // need to discuss
//     companyFields: [{ type: String }], // company working fields
//     // both
//     company: { type: String },
//     phone: { type: String },
//     address: { type: String },
//   }
// }
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
const getProfileFetchedProfile = ({ profile }) => profile.get('fetchUser');

const initialState = fromJS({
  isFetching: false,
  fetchError: '',
  fetchUser: {},
});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DETAIL:
      return state.set('isFetching', true)
        .set('fetchError', '')
        .set('fetchUser', {});
    case FETCH_DETAIL_SUCCESS:
      return state.set('isFetching', false)
        .set('fetchUser', action.payload);
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
