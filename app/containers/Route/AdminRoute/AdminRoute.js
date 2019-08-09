import { connect } from 'react-redux';
import AdminRoute from '../../../components/Route/AdminRoute';
import { checkAuthenticatedStatus, getUserRole } from '../../../reducers/auth';

const mapStateToProps = state => ({
  authenticated: checkAuthenticatedStatus(state),
  userRole: getUserRole(state),
});

export default connect(mapStateToProps)(AdminRoute);
