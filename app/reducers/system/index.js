import { fromJS } from 'immutable';
import {
  AUTH_LOGOUT,
  AUTH_LOGIN_SUCCESS,
} from '../auth';

export const REHYDRATE_COMPLETE = 'root/REHYDRATE_COMPLETE';
export const CLEAR_TRANSACTION = 'root/CLEAR_TRANSACTION';
export const CHANGE_LANGUAGE = 'root/CHANGE_LANGAUGE';

// action creator


// selector
export const isPageLoading = ({ system }) => system.get('isLoading');

export const getSystemLanguage = ({ system }) => system.get('lng');

const initialState = fromJS({
  isLoading: true,
  lng: 'en',
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

    case CHANGE_LANGUAGE: {
      const { lng } = action.payload;
      return state.set('lng', lng);
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
