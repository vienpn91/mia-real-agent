import { connect } from 'react-redux';
import { getTicketsList, getFetchingContext } from '../../../selectors/ticket';
import Ticket from '../../../components/TicketTab/Ticket';

const mapStateToProps = state => ({
  ticketList: getTicketsList(state),
  fetchingContext: getFetchingContext(state),
});

export default connect(mapStateToProps)(Ticket);
