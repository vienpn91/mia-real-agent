import { fromJS } from 'immutable';
import {
  AUTH_LOGOUT,
  AUTH_LOGIN_SUCCESS,
} from '../auth';

export const REHYDRATE_COMPLETE = 'root/REHYDRATE_COMPLETE';
export const CLEAR_TRANSACTION = 'root/CLEAR_TRANSACTION';

// action creator


// selector
export const isPageLoading = ({ system }) => system.get('isLoading');

const initialState = fromJS({
  isLoading: true,
});

function systemReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGOUT:
    case AUTH_LOGIN_SUCCESS: {
      return state.set('isLoading', false);
    }

    case CLEAR_TRANSACTION: {
      return state.set('isLoading', true);
    }

    default: return state;
  }
}

export default systemReducer;

export const actions = {
};

export const selectors = {
  isPageLoading,
};
