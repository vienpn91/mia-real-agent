import { connect } from 'react-redux';
import AdminDashboard from 'components/AdminDashboard';
import { actions } from 'reducers/admin';
import { selectors } from 'selectors/admin';

const mapStateToProps = state => ({
  ticketActivity: selectors.getTicketActivityData(state),
  applicationSummary: selectors.getApplicationSummaryData(state),
});

const mapDispatchToProps = {
  getTicketActivity: actions.dashboardGetTicketActivity,
  getApplicationSummary: actions.dashboardGetApplicationSummary,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
