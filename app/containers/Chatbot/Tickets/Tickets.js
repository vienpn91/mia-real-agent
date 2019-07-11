import { connect } from 'react-redux';
import Tickets from 'components/Chatbot/Tickets';
import {
  getTicketsList, getFetchingContext, getTicketIsArchiving, getTicketArchiveError,
} from 'selectors/ticket';
import { actions } from 'reducers/ticket';
import { getUserRole } from 'reducers/auth';

const mapStateToProps = state => ({
  tickets: getTicketsList(state),
  fetchingContext: getFetchingContext(state),
  isArchiving: getTicketIsArchiving(state),
  archiveError: getTicketArchiveError(state),
  userRole: getUserRole(state),
});

const mapDispatchToProps = {
  getAllAction: actions.getAllAction,
  archiveTicket: actions.archiveAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
