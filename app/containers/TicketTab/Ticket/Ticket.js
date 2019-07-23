import { connect } from 'react-redux';
import { getTicketsList, getFetchingContext, getTicketIdList } from '../../../selectors/ticket';
import { getConversationListByTicketList } from '../../../reducers/conversations';
import Ticket from '../../../components/TicketTab/Ticket';

const mapStateToProps = state => ({
  ticketList: getTicketsList(state),
  fetchingContext: getFetchingContext(state),
  conversationList: getConversationListByTicketList(state, getTicketIdList(state)),
});

export default connect(mapStateToProps)(Ticket);
