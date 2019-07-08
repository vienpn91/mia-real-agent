import TableManagement from 'components/TableManagement';
import { connect } from 'react-redux';
import { actions } from 'reducers/ticket';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectTickets,
  getIsLoading,
  getTotalCount,
  getSelectedPage,
  getSizePerPage,
} from 'selectors/ticket';
import { COLUMN_TYPE } from 'utils/constants';

const ticketColumns = [
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'ticketId',
    columnAttr: {
      value: 'Ticket',
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'category',
    columnAttr: {
      value: 'Category',
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'owner',
    columnAttr: {
      value: 'Owner',
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'assignee',
    columnAttr: {
      value: 'Assignee',
    },
  },
  {
    type: COLUMN_TYPE.STATUS,
    dataKey: 'status',
    columnAttr: {
      value: 'Status',
      textCenter: true,
    },
  },
];

const mapDispatchToProps = {
  fetchList: actions.getAllAction,
  changePage: actions.changePage,
};

const structureSelectorFunc = createStructuredSelector({
  items: makeSelectTickets(),
  isLoading: getIsLoading,
  totalCount: getTotalCount,
  selectedPage: getSelectedPage,
  sizePerPage: getSizePerPage,
});

const mapStateToProps = (state) => {
  const structureSelector = structureSelectorFunc(state);
  return {
    ...structureSelector,
    columns: ticketColumns,
    endpoint: 'admin/tickets',
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableManagement);
