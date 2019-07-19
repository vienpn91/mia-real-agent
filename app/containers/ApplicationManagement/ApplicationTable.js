import TableManagement from 'components/TableManagement';
import { connect } from 'react-redux';
import { actions } from 'reducers/application';
import { createStructuredSelector } from 'reselect';
import {
  getApplicationList,
  getIsFetching,
  getApplicationTotalRecord,
  getSelectedPage,
  getSizePerPage,
} from 'selectors/application';
import { COLUMN_TYPE } from 'utils/constants';

const applicationColumns = [
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'firstName',
    columnAttr: {
      value: 'First name',
      percent: 7,
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'lastName',
    columnAttr: {
      value: 'Last name',
      percent: 8,
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'categories',
    columnAttr: {
      value: 'Category',
      percent: 20,
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'lastName',
    columnAttr: {
      value: 'Years of EXP',
      percent: 10,
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'lastName',
    columnAttr: {
      value: 'Language',
      percent: 20,
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'cv',
    columnAttr: {
      value: 'CV',
      percent: 20,
    },
  },
  {
    type: COLUMN_TYPE.STATUS,
    dataKey: 'status',
    columnAttr: {
      value: 'Status',
      percent: 10,
    },
  },
  // {
  //   type: COLUMN_TYPE.TEXT,
  //   dataKey: 'lastName',
  //   columnAttr: {
  //     value: 'Last name',
  //     percent: 10,
  //   },
  // },
];

const mapDispatchToProps = {
  fetchList: actions.applicationAdminGetAll,
  changePage: actions.changePage,
};

const structureSelectorFunc = createStructuredSelector({
  items: getApplicationList,
  isLoading: getIsFetching,
  totalCount: getApplicationTotalRecord,
  selectedPage: getSelectedPage,
  sizePerPage: getSizePerPage,
});

const mapStateToProps = (state) => {
  const structureSelector = structureSelectorFunc(state);
  return {
    ...structureSelector,
    columns: applicationColumns,
    endpoint: 'admin/applications',
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableManagement);
