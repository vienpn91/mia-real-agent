import itemManagementHoc from 'hoc/ItemManagementHoc';
import { connect } from 'react-redux';
import { actions } from 'reducers/user';
import { reselectSorting } from 'selectors/user';
import { SORT } from 'utils/constants';
import UserTable from './UserTable';

const { USER_SORT } = SORT;

const mapStateToProps = state => ({
  sortItems: USER_SORT,
  createEndpoint: 'admin/user/create',
  title: 'All Users',
  currentSorting: reselectSorting(state),
});

const mapDispatchToProps = {
  handleSort: actions.userSorting,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(itemManagementHoc(UserTable));
