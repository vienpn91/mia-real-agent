import { connect } from 'react-redux';
import { getUserId, getUserRole } from 'reducers/auth';
import {
  fetchReplyMessages,
  isFetchingReplies,
  getErrorMessage,
  getReplyMessagesByConversationId,
  getSendingMessages,
  getSendingMessagesError,
  sendReplyMessage,
} from '../../reducers/replies';
import {
  actions,
} from '../../reducers/ticket';
import {
  getCurrentTicket,
} from '../../selectors/ticket';
import {
  getCurrentConveration,
  getCurrentConverationId,
  actions as CONVERSATION_ACTIONS
} from '../../reducers/conversations';
import {
  isFindingAgent,
  findAgentRequest,
} from '../../reducers/agents';
import MessageBox from '../../components/MessageBox';

const mapStateToProps = (state) => {
  const conversationId = getCurrentConverationId(state);

  return ({
    conversationId,
    userId: getUserId(state),
    currentConversation: getCurrentConveration(state),
    currentTicket: getCurrentTicket(state),
    isFetchingReplies: isFetchingReplies(state, conversationId),
    errorMessage: getErrorMessage(state, conversationId),
    replyMessages: getReplyMessagesByConversationId(state, conversationId),
    sendingMessages: getSendingMessages(state, conversationId),
    sendingMessageErrors: getSendingMessagesError(state, conversationId),
    isFindingAgent: isFindingAgent(state, conversationId),
    userRole: getUserRole(state),
  });
};

const mapDispatchToProps = {
  fetchReplyMessages,
  setCurrentTicket: actions.selectTicket,
  sendReplyMessage,
  findAgentRequest,
  submitRating: CONVERSATION_ACTIONS.submitConversationRating,
  joinConversation: CONVERSATION_ACTIONS.userJoinConversation,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);
