import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { ROUTE_DETAIL } from 'utils/constants';
// lodash
import _get from 'lodash/get';
import { getRouteMatch } from './router';

const emptyMap = fromJS({});
const emptyList = fromJS([]);

const getUsers = ({ user: userState }) => userState.get('user', emptyMap).toJS();

const getIsLoading = ({ user: userState }) => userState.get('isLoading', false);

const getSorting = ({ user: userState }) => userState.get('sorting', emptyMap);

const getAddNewContext = ({ user: userState }) => userState.get('addNew', emptyMap);

const getUpdateContext = ({ user: userState }) => userState.get('update', emptyMap);

const getVisibleUserIds = ({ user: userState }) => userState.get('visibleUserIds', emptyList);

const getTotalCount = ({ user: userState }) => userState.get('totalCount', 0);

const getSelectedPage = ({ user: userState }) => userState.getIn(['pagination', 'selectedPage'], 1);

const getSizePerPage = ({ user: userState }) => userState.getIn(['pagination', 'sizePerPage']);

const reselectUpdateContext = createSelector(getUpdateContext, update => update.toJS());

const reselectAddNewContext = createSelector(getAddNewContext, addNew => addNew.toJS());

const reselectSorting = createSelector(getSorting, sorting => sorting.toJS());

const reselectUsers = createSelector(
  getUsers,
  getVisibleUserIds,
  (users, visibleUserIds) => {
    const plainUserById = users;
    const plainVisibleUserIds = visibleUserIds.toJS();
    return plainVisibleUserIds.map(id => plainUserById[id]);
  },
);

const getUserIdFromRoute = createSelector(
  getRouteMatch(ROUTE_DETAIL.USER_DETAIL_ROUTER),
  match => _get(match, 'params.id', null),
);

const getUserDetailFromRoute = createSelector(
  getUserIdFromRoute,
  getUsers,
  (selectedId, users) => users.get(selectedId, emptyMap).toJS(),
);

const getCurrentUserRole = createSelector(
  getUsers,
  user => user.roles
);

export {
  getUsers,
  getIsLoading,
  getTotalCount,
  getSizePerPage,
  getSelectedPage,
  reselectUsers,
  reselectUpdateContext,
  reselectAddNewContext,
  reselectSorting,
  getUserIdFromRoute,
  getUserDetailFromRoute,
};
