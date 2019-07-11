import { connect } from 'react-redux';
import Ticket from 'components/TicketTab/Ticket';
import { getTicketsList, getFetchingContext } from 'selectors/ticket';
import { getUserRole } from 'reducers/auth';

const mapStateToProps = state => ({
  tickets: getTicketsList(state),
  fetchingContext: getFetchingContext(state),
  userRole: getUserRole(state),
});

export default connect(mapStateToProps)(Ticket);
