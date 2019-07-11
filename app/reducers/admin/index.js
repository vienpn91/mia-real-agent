import { fromJS } from 'immutable';

// import action type
export const TOGGLE_LEFT_SIDE_BAR = 'admin/TOGGLE_LEFT_SIDE_BAR';

/*
 *
 * Admins actions
 *
 */
function handleToggle() {
  return {
    type: TOGGLE_LEFT_SIDE_BAR,
  };
}

export const actions = {
  handleToggle,
};

// initialState
export const initialState = fromJS({
  toggleLeftSideBar: false,
});

// reducer
function modalReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LEFT_SIDE_BAR: {
      return state
        .update('toggleLeftSideBar', v => !v);
    }
    default:
      return state;
  }
}

export default modalReducer;
