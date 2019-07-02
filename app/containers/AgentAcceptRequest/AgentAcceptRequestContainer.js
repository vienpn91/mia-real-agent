import { connect } from 'react-redux';
import AgentAcceptRequest from 'components/AgentAcceptRequest';
import { actions, selectors } from '../../reducers/chat';
import { getUserId } from '../../reducers/auth';

const mapStateToProps = state => ({
  isOpen: selectors.getChatIsAgentRequesting(state),
  isConfirming: selectors.getChatIsAgentRequestIsConfirming(state),
  userId: getUserId(state),
  ticket: selectors.getChatIsAgentRequestTicket(state),
});

const mapDispatchToProps = {
  requestConfirm: actions.requestConfirmAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AgentAcceptRequest);
