import { connect } from 'react-redux';
import Ticket from 'components/TicketPage/Ticket';
import { selectors } from 'reducers/ticket';

const mapStateToProps = state => ({
  tickets: selectors.getTicketsList(state),
  fetchingContext: selectors.getFetchingContext(state),
});

export default connect(mapStateToProps)(Ticket);
