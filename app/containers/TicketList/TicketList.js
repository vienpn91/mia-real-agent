import { connect } from 'react-redux';
import { getUserRole } from 'reducers/auth';
import TicketList from '../../components/TicketList';
import {
  actions,
} from '../../reducers/ticket';
import {
  selectConversation,
} from '../../reducers/conversations';
import {
  getTicketsList,
  getTotalCount,
  getIsFetching,
} from '../../selectors/ticket';

const mapStateToProps = state => ({
  userRole: getUserRole(state),
  isFetchingList: getIsFetching(state),
  ticketList: getTicketsList(state),
  total: getTotalCount(state),
});

const mapDispatchToProps = {
  selectConversation,
  getAllTicketAction: actions.getAllTicketAction,
  closeAction: actions.closeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
