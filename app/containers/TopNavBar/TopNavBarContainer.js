import { connect } from 'react-redux';
import TopNavBar from 'components/TopNavBar/TopNavBar';
import { actions, getUserEmail } from '../../reducers/auth';

const mapStateToProps = state => ({
  email: getUserEmail(state),
});

const mapDispatchToProps = {
  logout: actions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNavBar);
