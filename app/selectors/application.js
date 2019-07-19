import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const emptyMap = fromJS({});
const emptyList = fromJS([]);

const getApplicationTotalRecord = ({ application }) => application.get('totalRecord');

const getSelectedPage = ({ application }) => application.getIn(['pagination', 'selectedPage'], 1);
const getSizePerPage = ({ application }) => application.getIn(['pagination', 'sizePerPage']);

const getApplicationsById = ({ application }) => application.get('applications');
const getVisibleApplicationIds = ({ application }) => application.get('visibleApplicationIds', emptyList);


const getApplicationList = createSelector(getApplicationsById, getVisibleApplicationIds, (applicationByIds, visibleApplicationIds) => {
  const plainApplicationById = applicationByIds.toJS();
  const plainVisibleApplicationIds = visibleApplicationIds.toJS();
  const sortApplications = plainVisibleApplicationIds.map(itemId => plainApplicationById[itemId]);

  return sortApplications;
});

const getSorting = ({ application }) => application.get('sorting', emptyMap);
const reselectSorting = createSelector(getSorting, sorting => sorting.toJS());


const getIsFetching = ({ application }) => application.getIn(['fetching', 'isFetching'], false);
const getFetchingError = ({ application }) => application.getIn(['fetching', 'errorMsg'], '');


export {
  reselectSorting,
  getSelectedPage,
  getSizePerPage,
  getApplicationTotalRecord,
  getApplicationList,

  getIsFetching,
  getFetchingError,
};
