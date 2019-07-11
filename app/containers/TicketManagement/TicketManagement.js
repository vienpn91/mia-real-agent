import itemManagementHoc from 'hoc/ItemManagementHoc';
import { connect } from 'react-redux';
import { actions as ticketActions } from 'reducers/ticket';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectSorting,
  makeSelectFiltering,
  getErrorMsg,
} from 'selectors/ticket';
import { toggleLeftSideBar } from 'selectors/admin';
import { SORT, FILTER } from 'utils/constants';
import TicketTable from './TicketTable';

const { TICKET_SORT } = SORT;
const { TICKET_FILTER } = FILTER;

const structureSelectorFunc = createStructuredSelector({
  currentSorting: makeSelectSorting,
  currentFiltering: makeSelectFiltering,
  errorMsg: getErrorMsg,
});

const mapStateToProps = (state) => {
  const structureSelector = structureSelectorFunc(state);

  return {
    ...structureSelector,
    createEndpoint: '/ticket/create',
    sortItems: TICKET_SORT,
    filterItems: TICKET_FILTER,
    shouldRenderFilter: true,
    toggleLeftSideBar: toggleLeftSideBar(state),
  };
};

const mapDispatchToProps = {
  handleSort: ticketActions.sortVariant,
  handleFilter: ticketActions.filterVariant,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(itemManagementHoc(TicketTable));
