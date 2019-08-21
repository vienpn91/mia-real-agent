import itemManagementHoc from 'hoc/ItemManagementHoc';
import { connect } from 'react-redux';
import { actions as userActions } from 'reducers/user';
import { reselectSorting } from 'selectors/user';
import { SORT } from 'utils/constants';
import UserTable from './UserTable';
import { toI18n } from '../../utils/func-utils';

const { USER_SORT } = SORT;

const mapStateToProps = state => ({
  sortItems: USER_SORT,
  createEndpoint: '/admin/user/create',
  title: toI18n('ADMIN_USERS_TABLE_ALL_USERS'),
  currentSorting: reselectSorting(state),
});

const mapDispatchToProps = {
  handleSort: userActions.userSorting,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(itemManagementHoc(UserTable));
