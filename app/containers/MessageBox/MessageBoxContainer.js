import { connect } from 'react-redux';
import { getUserId } from 'reducers/auth';
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
  getCurrentConveration,
  getCurrentConverationId,
} from '../../reducers/conversations';
import MessageBox from '../../components/MessageBox';

const mapStateToProps = (state) => {
  const conversationId = getCurrentConverationId(state);

  return ({
    conversationId,
    userId: getUserId(state),
    currentConversation: getCurrentConveration(state),
    isFetchingReplies: isFetchingReplies(state, conversationId),
    errorMessage: getErrorMessage(state, conversationId),
    replyMessages: getReplyMessagesByConversationId(state, conversationId),
    sendingMessages: getSendingMessages(state, conversationId),
    sendingMessageErrors: getSendingMessagesError(state, conversationId),
  });
};

const mapDispatchToProps = {
  fetchReplyMessages,
  sendReplyMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);
