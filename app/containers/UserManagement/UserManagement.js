import itemManagementHoc from 'hoc/ItemManagementHoc';
import { connect } from 'react-redux';
import { actions as userActions } from 'reducers/user';
import { reselectSorting } from 'selectors/user';
import { toggleLeftSideBar } from 'selectors/admin';
import { SORT } from 'utils/constants';
import UserTable from './UserTable';

const { USER_SORT } = SORT;

const mapStateToProps = state => ({
  sortItems: USER_SORT,
  createEndpoint: 'admin/user/create',
  title: 'All Users',
  currentSorting: reselectSorting(state),
  toggleLeftSideBar: toggleLeftSideBar(state),
});

const mapDispatchToProps = {
  handleSort: userActions.userSorting,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(itemManagementHoc(UserTable));
