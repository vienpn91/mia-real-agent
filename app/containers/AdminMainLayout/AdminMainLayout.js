import { connect } from 'react-redux';
import AdminMainLayout from 'components/AdminMainLayout';
import { toggleLeftSideBar } from 'selectors/admin';

const mapStateToProps = state => ({
  toggleLeftSideBar: toggleLeftSideBar(state),
});

export default connect(mapStateToProps)(AdminMainLayout);
