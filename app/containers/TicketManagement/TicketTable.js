import TableManagement from 'components/TableManagement';
import { connect } from 'react-redux';
import { actions } from 'reducers/ticket';
import { createStructuredSelector } from 'reselect';
import history from 'utils/history';
import {
  getTicketsList,
  getIsFetching,
  getTicketTotalRecord,
  getSelectedPage,
  getSizePerPage,
} from 'selectors/ticket';
import { COLUMN_TYPE } from 'utils/constants';

const ticketColumns = [
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'ticketId',
    columnAttr: {
      value: 'TicketId',
      percent: 10,
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'title',
    columnAttr: {
      value: 'Title',
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'category',
    columnAttr: {
      value: 'Category',
      percent: 10,
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'owner.username',
    columnAttr: {
      value: 'Owner',
      percent: 15,
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'assignee.username',
    columnAttr: {
      value: 'Assignee',
      percent: 15,
    },
  },
  {
    type: COLUMN_TYPE.STATUS,
    dataKey: 'status',
    columnAttr: {
      value: 'Status',
      textCenter: true,
      percent: 10,
    },
  },
];

const mapDispatchToProps = {
  fetchList: actions.ticketAdminGetAll,
  changePage: actions.changePage,
};

const structureSelectorFunc = createStructuredSelector({
  items: getTicketsList,
  isLoading: getIsFetching,
  totalCount: getTicketTotalRecord,
  selectedPage: getSelectedPage,
  sizePerPage: getSizePerPage,
});

const mapStateToProps = (state) => {
  const structureSelector = structureSelectorFunc(state);
  return {
    ...structureSelector,
    columns: ticketColumns,
    onClick: ({ ticketId, owner: { _id } }) => { history.push(`/admin/tickets/${ticketId}/${_id}`); },
    endpoint: 'admin/tickets',
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableManagement);
