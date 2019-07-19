import itemManagementHoc from 'hoc/ItemManagementHoc';
import { connect } from 'react-redux';
import { actions } from 'reducers/application';
import {
  reselectSorting,
  getFetchingError,
} from 'selectors/application';
import { SORT } from 'utils/constants';
import TicketTable from './ApplicationTable';

const { APPLICATION_SORT } = SORT;

const mapStateToProps = state => ({
  errorMsg: getFetchingError(state),
  currentSorting: reselectSorting(state),
  // createEndpoint: 'admin/ticket/create',
  title: 'All Applications',
  sortItems: APPLICATION_SORT,
});

const mapDispatchToProps = {
  handleSort: actions.sortApplication,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(itemManagementHoc(TicketTable));
