import { connect } from 'react-redux';
import AdminDashboard from 'components/AdminDashboard';
import { actions } from 'reducers/admin';
import { selectors } from 'selectors/admin';

const mapStateToProps = state => ({
  ticketActivity: selectors.getTicketActivityData(state),
  applicationSummary: selectors.getApplicationSummaryData(state),
  userSummary: selectors.getUserSummaryData(state),
});

const mapDispatchToProps = {
  getTicketActivity: actions.dashboardGetTicketActivity,
  getApplicationSummary: actions.dashboardGetApplicationSummary,
  getUserSummary: actions.dashboardGetUserSummary,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
