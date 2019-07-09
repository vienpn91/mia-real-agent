import { connect } from 'react-redux';
import TopNavBar from 'components/TopNavBar/TopNavBar';
import { actions } from '../../reducers/auth';

const mapDispatchToProps = {
  logout: actions.logout,
};

export default connect(null, mapDispatchToProps)(TopNavBar);
