import { connect } from 'react-redux';
import Tickets from 'components/Chatbot/Tickets';
import { selectors, actions } from 'reducers/ticket';
import { getUserRole } from 'reducers/auth';

const mapStateToProps = state => ({
  tickets: selectors.getTicketsList(state),
  fetchingContext: selectors.getFetchingContext(state),
  isArchiving: selectors.getTicketIsArchiving(state),
  archiveError: selectors.getTicketArchiveError(state),
  userRole: getUserRole(state),
});

const mapDispatchToProps = {
  getAllAction: actions.getAllAction,
  archiveTicket: actions.archiveAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
