import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Chatbot from '../../components/Chatbot';
import {
  getConversationDetail,
  isFetchingList,
  isFetchingSingleItem,
  getTotalConverations,
  getErrorMessage,
  getCurrentConveration,
  getConverationById,
  selectConversation,
} from '../../reducers/conversations';
import { getUserRole } from '../../reducers/auth';

const mapStateToProps = state => ({
  userRole: getUserRole(state),
  isFetchingList: isFetchingList(state),
  isFetchingConversation: isFetchingSingleItem(state),
  total: getTotalConverations(state),
  errorMsg: getErrorMessage(state),
  currentConversation: getConverationById(state, getCurrentConveration(state)),
});

const mapDispatchToProps = {
  getConversationDetail,
  selectConversation,
};

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Chatbot));
