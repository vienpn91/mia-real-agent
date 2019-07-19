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
import { APPLICATION_STATUS } from '../../../common/enums';

const applicationColumns = [
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: ['firstName', 'lastName'],
    columnAttr: {
      value: 'Full name',
      percent: 15,
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'categories',
    columnAttr: {
      value: 'Category',
      percent: 25,
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'yearsOfExp',
    columnAttr: {
      value: 'Years of EXP',
      percent: 10,
    },
  },
  {
    type: COLUMN_TYPE.ARRAY,
    dataKey: 'languages',
    key: 'name',
    columnAttr: {
      value: 'Language',
      percent: 25,
    },
  },
  {
    type: COLUMN_TYPE.LINK,
    dataKey: 'cv',
    columnAttr: {
      value: 'CV',
      percent: 5,
    },
  },
  {
    type: COLUMN_TYPE.STATUS,
    dataKey: 'status',
    columnAttr: {
      value: 'Status',
      percent: 5,
    },
  },
  {
    type: COLUMN_TYPE.ACTIONS,
    actions: [
      {
        dataKey: 'status',
        oneOf: [APPLICATION_STATUS.REVIEWING],
        action: 'applicationApprove',
        type: 'check',
      },
      {
        dataKey: 'status',
        oneOf: [APPLICATION_STATUS.REVIEWING],
        action: 'applicationReject',
        type: 'close',
      },
      {
        dataKey: 'status',
        oneOf: [APPLICATION_STATUS.PENDING],
        action: 'applicationReview',
        type: 'audit',
      },
    ],
    columnAttr: {
      value: 'Actions',
      percent: 10,
    },
  },
];

const mapDispatchToProps = {
  fetchList: actions.applicationAdminGetAll,
  changePage: actions.changePage,
  applicationApprove: actions.applicationApprove,
  applicationReject: actions.applicationReject,
  applicationReview: actions.applicationReview,
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
