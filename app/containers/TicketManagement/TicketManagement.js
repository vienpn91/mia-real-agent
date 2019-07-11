import itemManagementHoc from 'hoc/ItemManagementHoc';
import { connect } from 'react-redux';
import { actions } from 'reducers/ticket';
import {
  reselectSorting,
  getFetchingError,
} from 'selectors/ticket';
import { SORT } from 'utils/constants';
import TicketTable from './TicketTable';

const { TICKET_SORT } = SORT;

const mapStateToProps = state => ({
  errorMsg: getFetchingError(state),
  currentSorting: reselectSorting(state),
  createEndpoint: 'admin/ticket/create',
  title: 'All Tickets',
  sortItems: TICKET_SORT,
});

const mapDispatchToProps = {
  handleSort: actions.sortTicket,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(itemManagementHoc(TicketTable));
