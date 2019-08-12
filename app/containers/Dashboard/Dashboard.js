import { connect } from 'react-redux';
import Dashboard from '../../components/Dashboard';
import { getUserRole } from '../../reducers/auth';

const mapStateToProps = state => ({
  userRole: getUserRole(state),
});

export default connect(mapStateToProps)(Dashboard);
