import { fromJS } from 'immutable';

// import action type
export const TOGGLE_LEFT_SIDE_BAR = 'admin/TOGGLE_LEFT_SIDE_BAR';

export const DASHBOARD_GET_TICKET_ACTIVITY = 'admin/DASHBOARD_GET_TICKET_ACTIVITY';
export const DASHBOARD_GET_TICKET_ACTIVITY_SUCCESS = 'admin/DASHBOARD_GET_TICKET_ACTIVITY_SUCCESS';
export const DASHBOARD_GET_TICKET_ACTIVITY_FAIL = 'admin/DASHBOARD_GET_TICKET_ACTIVITY_FAIL';

export const DASHBOARD_GET_APPLICATION_SUMMARY = 'admin/DASHBOARD_GET_APPLICATION_SUMMARY';
export const DASHBOARD_GET_APPLICATION_SUMMARY_SUCCESS = 'admin/DASHBOARD_GET_APPLICATION_SUMMARY_SUCCESS';
export const DASHBOARD_GET_APPLICATION_SUMMARY_FAIL = 'admin/DASHBOARD_GET_APPLICATION_SUMMARY_FAIL';

export const DASHBOARD_GET_USER_SUMMARY = 'admin/DASHBOARD_GET_USER_SUMMARY';
export const DASHBOARD_GET_USER_SUMMARY_SUCCESS = 'admin/DASHBOARD_GET_USER_SUMMARY_SUCCESS';
export const DASHBOARD_GET_USER_SUMMARY_FAIL = 'admin/DASHBOARD_GET_USER_SUMMARY_FAIL';

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

const dashboardGetApplicationSummary = () => ({
  type: DASHBOARD_GET_APPLICATION_SUMMARY,
});

const dashboardGetApplicationSummarySuccess = application => ({
  type: DASHBOARD_GET_APPLICATION_SUMMARY_SUCCESS,
  application,
});

const dashboardGetApplicationSummaryFail = errorMessage => ({
  type: DASHBOARD_GET_APPLICATION_SUMMARY_FAIL,
  errorMessage,
});

const dashboardGetUserSummary = () => ({
  type: DASHBOARD_GET_USER_SUMMARY,
});

const dashboardGetUserSummarySuccess = user => ({
  type: DASHBOARD_GET_USER_SUMMARY_SUCCESS,
  user,
});

const dashboardGetUserSummaryFail = errorMessage => ({
  type: DASHBOARD_GET_USER_SUMMARY_FAIL,
  errorMessage,
});

export const actions = {
  handleToggle,
  dashboardGetTicketActivity,
  dashboardGetTicketActivitySuccess,
  dashboardGetTicketActivityFail,

  dashboardGetApplicationSummary,
  dashboardGetApplicationSummarySuccess,
  dashboardGetApplicationSummaryFail,

  dashboardGetUserSummary,
  dashboardGetUserSummarySuccess,
  dashboardGetUserSummaryFail,
};

// initialState
export const initialState = fromJS({
  toggleLeftSideBar: false,
  ticketActivity: {
    isLoading: false,
    data: {},
    error: null,
  },

  applicationSummary: {
    isLoading: false,
    data: {},
    error: null,
  },

  userSummary: {
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

    case DASHBOARD_GET_APPLICATION_SUMMARY: {
      return state
        .setIn(['applicationSummary', 'isLoading'], true)
        .setIn(['applicationSummary', 'data'], {});
    }
    case DASHBOARD_GET_APPLICATION_SUMMARY_SUCCESS: {
      const { application } = action;
      return state
        .setIn(['applicationSummary', 'isLoading'], false)
        .setIn(['applicationSummary', 'data'], application);
    }
    case DASHBOARD_GET_APPLICATION_SUMMARY_FAIL: {
      const { errorMessage } = action;
      return state
        .setIn(['applicationSummary', 'isLoading'], false)
        .setIn(['applicationSummary', 'error'], errorMessage);
    }

    case DASHBOARD_GET_USER_SUMMARY: {
      return state
        .setIn(['userSummary', 'isLoading'], true)
        .setIn(['userSummary', 'data'], {});
    }
    case DASHBOARD_GET_USER_SUMMARY_SUCCESS: {
      const { user } = action;
      return state
        .setIn(['userSummary', 'isLoading'], false)
        .setIn(['userSummary', 'data'], user);
    }
    case DASHBOARD_GET_USER_SUMMARY_FAIL: {
      const { errorMessage } = action;
      return state
        .setIn(['userSummary', 'isLoading'], false)
        .setIn(['userSummary', 'error'], errorMessage);
    }
    default:
      return state;
  }
}

export default modalReducer;
