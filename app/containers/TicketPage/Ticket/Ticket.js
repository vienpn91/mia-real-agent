import { connect } from 'react-redux';
import Ticket from 'components/TicketPage/Ticket';
import { selectors } from 'reducers/ticket';
import { getUserRole } from 'reducers/auth';

const mapStateToProps = state => ({
  tickets: selectors.getTicketsList(state),
  fetchingContext: selectors.getFetchingContext(state),
  userRole: getUserRole(state),
});

export default connect(mapStateToProps)(Ticket);
