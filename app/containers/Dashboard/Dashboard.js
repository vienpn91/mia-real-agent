import { connect } from 'react-redux';
import Dashboard from '../../components/Dashboard';
import { getUserRole } from '../../reducers/auth';
import { getRequestTotal } from '../../reducers/requests';

const mapStateToProps = state => ({
  userRole: getUserRole(state),
  totalRequest: getRequestTotal(state),
});

export default connect(mapStateToProps)(Dashboard);
