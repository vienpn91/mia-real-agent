import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import AgentAcceptRequest from '../../components/AgentAcceptRequest';
import {
  getRequestData,
  agentConfirmAction,
  isWaitingForComfirm,
  isSendingConfirmation,
} from '../../reducers/agents';
import { getUserId } from '../../reducers/auth';
import { getCurrentConverationId } from '../../reducers/conversations';

const mapStateToProps = state => ({
  isOpen: isWaitingForComfirm(state),
  isConfirming: isSendingConfirmation(state),
  userId: getUserId(state),
  conversationId: getCurrentConverationId(state),
  requestData: getRequestData(state),
});

const mapDispatchToProps = {
  agentConfirmAction,
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(AgentAcceptRequest);
