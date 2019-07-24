import { connect } from 'react-redux';
import { getUserId } from 'reducers/auth';
import { fetchReplyMessages } from '../../reducers/replies';
import { getCurrentConveration } from '../../reducers/conversations';
import MessageBox from '../../components/MessageBox';

const mapStateToProps = state => ({
  userId: getUserId(state),
  currentConversation: getCurrentConveration(state),
});

const mapDispatchToProps = {
  fetchReplyMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);
