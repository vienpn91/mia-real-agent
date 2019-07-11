import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { fetchingObj } from 'reducers/ticket';

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
const getTicketsById = ({ ticket }) => ticket.get('tickets');
const getVisibleTicketIds = ({ ticket }) => ticket.get('visibleTicketIds', emptyList);
const getTicketsList = createSelector(getTicketsById, getVisibleTicketIds, (ticketByIds, visibleTicketIds) => {
  const plainTicketById = ticketByIds.toJS();
  const plainVisibleTicketIds = visibleTicketIds.toJS();
  const sortTickets = plainVisibleTicketIds.map(itemId => plainTicketById[itemId]);

  return sortTickets;
});

const getTicketIsArchiving = ({ ticket }) => ticket.get('isArchiving');
const getTicketArchiveError = ({ ticket }) => ticket.get('archiveError');

const getFetchingContext = ({ ticket }) => ticket.get('fetching', fetchingObj).toJS();

const getSelectedPage = ({ ticket }) => ticket.getIn(['pagination', 'selectedPage'], 1);
const getSizePerPage = ({ ticket }) => ticket.getIn(['pagination', 'sizePerPage']);

const getSorting = ({ ticket }) => ticket.get('sorting', emptyMap);
const reselectSorting = createSelector(getSorting, sorting => sorting.toJS());

const getIsFetching = ({ ticket }) => ticket.getIn(['fetching', 'isFetching'], false);
const getFetchingError = ({ ticket }) => ticket.getIn(['fetching', 'errorMsg'], '');

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
};
