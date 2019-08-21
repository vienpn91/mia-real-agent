import itemManagementHoc from 'hoc/ItemManagementHoc';
import { connect } from 'react-redux';
import { actions } from 'reducers/application';
import {
  reselectSorting,
  getFetchingError,
} from 'selectors/application';
import { SORT } from 'utils/constants';
import TicketTable from './ApplicationTable';
import { toI18n } from '../../utils/func-utils';

const { APPLICATION_SORT } = SORT;

const mapStateToProps = state => ({
  errorMsg: getFetchingError(state),
  currentSorting: reselectSorting(state),
  // createEndpoint: 'admin/ticket/create',
  title: toI18n('ADMIN_APPLICATION_TABLE_ALL_APPLICATIONS'),
  sortItems: APPLICATION_SORT,
});

const mapDispatchToProps = {
  handleSort: actions.sortApplication,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(itemManagementHoc(TicketTable));
