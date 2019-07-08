import _get from 'lodash/get';
import _values from 'lodash/values';
import _pick from 'lodash/pick';
import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { initialState as ticketInitialState } from 'reducers/ticket';

const emptyMap = fromJS({});
const emptyList = fromJS([]);

const getTicketState = state => _get(state, 'ticket', ticketInitialState);

const getTickets = state => getTicketState(state).get('tickets', emptyMap);

const getVisibleTicketIds = state => getTicketState(state).get('visibleTicketIds', emptyList);

const getTotalCount = state => getTicketState(state).get('totalCount', 0);

const getSelectedPage = state => getTicketState(state).getIn(['pagination', 'selectedPage'], 1);
const getSizePerPage = state => getTicketState(state).getIn(['pagination', 'sizePerPage']);

const getSorting = state => getTicketState(state).get('sorting', emptyMap);
const makeSelectSorting = createSelector(getSorting, sorting => sorting.toJS());

const getFiltering = state => getTicketState(state).get('filtering', emptyMap);
const makeSelectFiltering = createSelector(getFiltering, filtering => filtering.toJS(),);

const makeSelectTickets = () => createSelector(
  getTickets,
  getVisibleTicketIds,
  (tickets, visibleTicketIds) => {
    const plainTickets = tickets.toJS();
    const plainVisibleTicketIds = visibleTicketIds.toJS();

    const visibleTicket = _pick(plainTickets, plainVisibleTicketIds);
    return _values(visibleTicket);
  },
);

const getIsLoading = state => getTicketState(state).get('isLoading', false);
const getErrorMsg = createSelector(getTicketState, ticketState => ticketState.get('message', ''),);

export {
  makeSelectSorting,
  makeSelectFiltering,
  makeSelectTickets,
  getTotalCount,
  getSelectedPage,
  getSizePerPage,
  getIsLoading,
  getErrorMsg,
};
