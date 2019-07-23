import itemDetailListHoc from 'hoc/ItemDetailHoc/ItemDetailListHoc';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'reducers/ticket';
import {
  reselectSorting,
  getIsFetching,
  reselectTickets,
  getTicketIdFromRoute,
  getTotalCount,
  getSelectedPage,
  getSizePerPage,
} from 'selectors/ticket';
import { SORT } from 'utils/constants';
import TicketDetailListItem from 'components/TicketDetail/TicketDetailListItem';
const { USER_SORT } = SORT;

const structureSelectorFunc = createStructuredSelector({
  currentSorting: reselectSorting,
  isLoading: getIsFetching,
  selectedId: getTicketIdFromRoute,
  items: reselectTickets,
  totalCount: getTotalCount,
  selectedPage: getSelectedPage,
  sizePerPage: getSizePerPage,
});

const mapStateToProps = (state) => {
  const structureSelector = structureSelectorFunc(state);

  return {
    ...structureSelector,
    sortItems: USER_SORT,
    title: 'All Tickets',
  };
};

const mapDispatchToProps = {
  handleSort: actions.ticketSorting,
  fetchList: actions.ticketAdminGetAll,
  changePage: actions.changePage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(itemDetailListHoc(TicketDetailListItem));
