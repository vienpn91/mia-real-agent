import { connect } from 'react-redux';
import AgentAcceptRequest from 'components/AgentAcceptRequest';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { actions, selectors } from '../../reducers/chat';
import { getUserId } from '../../reducers/auth';

const mapStateToProps = state => ({
  isOpen: selectors.getChatIsAgentRequesting(state),
  isConfirming: selectors.getChatIsAgentRequestIsConfirming(state),
  userId: getUserId(state),
  ticket: selectors.getChatIsAgentRequestTicket(state),
  redirectData: selectors.getChatIsAgentRequestConfirmRedirectData(state),
});

const mapDispatchToProps = {
  requestConfirm: actions.requestConfirmAction,
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(AgentAcceptRequest);
