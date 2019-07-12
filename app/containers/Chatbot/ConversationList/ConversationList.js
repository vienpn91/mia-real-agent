import { connect } from 'react-redux';
import ConversationList from 'components/Chatbot/ConversationList';
import {
  getTicketsList, getFetchingContext, getTicketIsArchiving, getTicketArchiveError,
} from 'selectors/ticket';
import { actions } from 'reducers/ticket';
import { selectConversation } from 'reducers/conversations';
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
  selectConversation,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationList);
