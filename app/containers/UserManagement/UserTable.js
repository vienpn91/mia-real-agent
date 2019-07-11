import TableManagement from 'components/TableManagement';
import { connect } from 'react-redux';
import { actions } from 'reducers/user';
import { createStructuredSelector } from 'reselect';
import {
  reselectUsers,
  getIsLoading,
  getTotalCount,
  getSelectedPage,
  getSizePerPage,
} from 'selectors/user';
import { COLUMN_TYPE } from 'utils/constants';

const userColumns = [
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'username',
    columnAttr: {
      value: 'Username',
      percent: '15',
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'email',
    columnAttr: {
      value: 'Email',
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'profile.company',
    columnAttr: {
      value: 'Company',
      percent: '15',
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'profile.phone',
    columnAttr: {
      value: 'Phone',
      percent: '15',
    },
  },
  {
    type: COLUMN_TYPE.UPPERCASE,
    dataKey: 'role',
    columnAttr: {
      value: 'Role',
      percent: '15',
    },
  },
];

const mapDispatchToProps = {
  fetchList: actions.fetchListUser,
  changePage: actions.changePage,
};

const structureSelectorFunc = createStructuredSelector({
  items: reselectUsers,
  isLoading: getIsLoading,
  totalCount: getTotalCount,
  selectedPage: getSelectedPage,
  sizePerPage: getSizePerPage,
});

const mapStateToProps = (state) => {
  const structureSelector = structureSelectorFunc(state);

  return {
    ...structureSelector,
    columns: userColumns,
    endpoint: 'admin/user',
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableManagement);
