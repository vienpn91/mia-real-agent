import { connect } from 'react-redux';
import MessageBox from '../../../components/Chatbot/MessageBox/MessageBox';
import { actions, selectors } from '../../../reducers/chat';
import { getUserId } from '../../../reducers/auth';

const mapStateToProps = state => ({
  chatData: selectors.getChatData(state),
  isGetting: selectors.getChatIsGetting(state),
  userId: getUserId(state),
});

const mapDispatchToProps = {
  getChat: actions.getChatAction,
  sendMessage: actions.insertMessageAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);
