import { connect } from 'react-redux';
import ProfileUser from 'components/AdminTopNavBar/ProfileUser/ProfileUser';
import { getUserEmail, actions, getUsername } from '../../reducers/auth';

const mapStateToProps = state => ({
  email: getUserEmail(state),
  username: getUsername(state),
});

const mapDispatchToProps = {
  onLogout: actions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
