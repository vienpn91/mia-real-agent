import { connect } from 'react-redux';
import TicketActivity from 'components/AdminDashboard/TicketActivity';
import { actions } from '../../../reducers/admin';
import { selectors } from '../../../selectors/admin';

const mapStateToProps = state => ({
  data: selectors.getTicketActivityData(state),
});

const mapDispatchToProps = {
  getTicketActivity: actions.dashboardGetTicketActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketActivity);
