import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import _get from 'lodash/get';
import { fetchingObj } from 'reducers/ticket';
import { ROUTE_DETAIL } from '../utils/constants';
import { getRouteMatch } from './router';

const emptyMap = fromJS({});
const emptyList = fromJS([]);

const getTicketIsCreating = ({ ticket }) => ticket.get('isCreating');
const getTicketCreateError = ({ ticket }) => ticket.get('createError');
const getTicketIsUpdating = ({ ticket }) => ticket.get('isUpdating');
const getTicketUpdateError = ({ ticket }) => ticket.get('updateError');
const getTicketTotalRecord = ({ ticket }) => ticket.get('totalRecord');
const getTicketGetTicketDetail = ({ ticket }, id, owner) => ticket.getIn(['tickets', `${id}#${owner}`], emptyMap).toJS();
const getTicketGetTicketIsGetting = ({ ticket }) => ticket.get('isGetting');
const getTicketGetTicketError = ({ ticket }) => ticket.get('getError');
const getTicketsById = ({ ticket }) => ticket.get('tickets').toJS();
const getVisibleTicketIds = ({ ticket }) => ticket.get('visibleTicketIds', emptyList).toJS();
const getTicketsList = createSelector(
  getTicketsById,
  getVisibleTicketIds,
  (ticketByIds, visibleTicketIds) => visibleTicketIds.map(itemId => ticketByIds[itemId])
);
const getTicketIdList = createSelector(
  getTicketsList,
  // eslint-disable-next-line no-underscore-dangle
  ticketList => ticketList.map(ticket => ticket._id)
);

const getTicketIsArchiving = ({ ticket }) => ticket.get('isArchiving');
const getTicketArchiveError = ({ ticket }) => ticket.get('archiveError');

const getFetchingContext = ({ ticket }) => ticket.get('fetching', fetchingObj).toJS();

const getSelectedPage = ({ ticket }) => ticket.getIn(['pagination', 'selectedPage'], 1);
const getSizePerPage = ({ ticket }) => ticket.getIn(['pagination', 'sizePerPage']);

const getSorting = ({ ticket }) => ticket.get('sorting', emptyMap);
const reselectSorting = createSelector(getSorting, sorting => sorting.toJS());

const getIsFetching = ({ ticket }) => ticket.getIn(['fetching', 'isFetching'], false);
const getFetchingError = ({ ticket }) => ticket.getIn(['fetching', 'errorMsg'], '');

const getTickets = ({ ticket }) => ticket.get('tickets', emptyMap);

const getTotalCount = ({ ticket }) => ticket.get('totalRecord', 0);

const reselectTickets = createSelector(
  getTickets,
  getVisibleTicketIds,
  (tickets, visibleTicketIds) => {
    const plainTicketById = tickets.toJS();
    const plainVisibleTicketIds = visibleTicketIds.toJS();
    return plainVisibleTicketIds.map(id => plainTicketById[id]);
  },
);

const getTicketIdFromRoute = createSelector(
  getRouteMatch(ROUTE_DETAIL.TICKET_DETAIL_ROUTER),
  match => _get(match, 'params.id', null),
);

const getTicketOwnerFromRoute = createSelector(
  getRouteMatch(ROUTE_DETAIL.TICKET_DETAIL_ROUTER),
  match => _get(match, 'params.owner', null),
);

const getTicketPathFromRoute = createSelector(
  getTicketIdFromRoute,
  getTicketOwnerFromRoute,
  (selectedId, owner) => `${selectedId}#${owner}`,
);

const getTicketDetailFromRoute = createSelector(
  getTicketPathFromRoute,
  getTickets,
  (path, tickets) => tickets.get(path, emptyMap).toJS(),
);


export {
  reselectSorting,
  getSelectedPage,
  getSizePerPage,
  getTicketIsCreating,
  getTicketCreateError,
  getTicketIsUpdating,
  getTicketUpdateError,
  getTicketTotalRecord,
  getTicketGetTicketDetail,
  getTicketGetTicketIsGetting,
  getTicketGetTicketError,
  getTicketsList,
  getFetchingContext,
  getTicketIsArchiving,
  getTicketArchiveError,
  getIsFetching,
  getFetchingError,
  getTicketIdList,

  reselectTickets,
  getTicketIdFromRoute,
  getTicketDetailFromRoute,
  getTotalCount,
};
