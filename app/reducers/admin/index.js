import { fromJS } from 'immutable';

// import action type
export const TOGGLE_LEFT_SIDE_BAR = 'admin/TOGGLE_LEFT_SIDE_BAR';

export const DASHBOARD_GET_TICKET_ACTIVITY = 'admin/DASHBOARD_GET_TICKET_ACTIVITY';
export const DASHBOARD_GET_TICKET_ACTIVITY_SUCCESS = 'admin/DASHBOARD_GET_TICKET_ACTIVITY_SUCCESS';
export const DASHBOARD_GET_TICKET_ACTIVITY_FAIL = 'admin/DASHBOARD_GET_TICKET_ACTIVITY_FAIL';

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

const dashboardGetTicketActivity = () => ({
  type: DASHBOARD_GET_TICKET_ACTIVITY,
});

const dashboardGetTicketActivitySuccess = activity => ({
  type: DASHBOARD_GET_TICKET_ACTIVITY_SUCCESS,
  activity,
});

const dashboardGetTicketActivityFail = errorMessage => ({
  type: DASHBOARD_GET_TICKET_ACTIVITY_FAIL,
  errorMessage,
});

export const actions = {
  handleToggle,
  dashboardGetTicketActivity,
  dashboardGetTicketActivitySuccess,
  dashboardGetTicketActivityFail,
};

// initialState
export const initialState = fromJS({
  toggleLeftSideBar: false,
  ticketActivity: {
    isLoading: false,
    data: {},
    error: null,
  },
});

// reducer
function modalReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LEFT_SIDE_BAR: {
      return state
        .update('toggleLeftSideBar', v => !v);
    }
    case DASHBOARD_GET_TICKET_ACTIVITY: {
      return state
        .setIn(['ticketActivity', 'isLoading'], true)
        .setIn(['ticketActivity', 'data'], {});
    }
    case DASHBOARD_GET_TICKET_ACTIVITY_SUCCESS: {
      const { activity } = action;
      return state
        .setIn(['ticketActivity', 'isLoading'], false)
        .setIn(['ticketActivity', 'data'], activity);
    }
    case DASHBOARD_GET_TICKET_ACTIVITY_FAIL: {
      const { errorMessage } = action;
      return state
        .setIn(['ticketActivity', 'isLoading'], false)
        .setIn(['ticketActivity', 'error'], errorMessage);
    }
    default:
      return state;
  }
}

export default modalReducer;
