import { connect } from 'react-redux';
import TopNavBar from 'components/TopNavBar';
import { actions, getUserEmail, getUserRole } from '../../reducers/auth';

const mapStateToProps = state => ({
  email: getUserEmail(state),
  userRole: getUserRole(state),
});

const mapDispatchToProps = {
  logout: actions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNavBar);
