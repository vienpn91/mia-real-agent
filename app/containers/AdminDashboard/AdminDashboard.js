import { connect } from 'react-redux';
import AdminDashboard from 'components/AdminDashboard';
import { toggleLeftSideBar } from 'selectors/admin';

const mapStateToProps = state => ({
  toggleLeftSideBar: toggleLeftSideBar(state),
});

export default connect(mapStateToProps)(AdminDashboard);
