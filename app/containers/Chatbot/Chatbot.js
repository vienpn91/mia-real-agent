import { connect } from 'react-redux';
import Chatbot from '../../components/Chatbot';
import {
  getConversationDetail,
  isFetchingList,
  isFetchingSingleItem,
  getTotalConverations,
  getErrorMessage,
  getCurrentConverationId,
  getCurrentConveration,
  selectConversation,
} from '../../reducers/conversations';
import { getUserRole } from '../../reducers/auth';
import { getChatLogByConversationId } from '../../reducers/chatlog';

const mapStateToProps = state => ({
  userRole: getUserRole(state),
  isFetchingList: isFetchingList(state),
  isFetchingConversation: isFetchingSingleItem(state),
  total: getTotalConverations(state),
  errorMsg: getErrorMessage(state),
  currentConversation: getCurrentConveration(state),
  chatLog: getChatLogByConversationId(state, getCurrentConverationId(state)),
});

const mapDispatchToProps = {
  getConversationDetail,
  selectConversation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatbot);
