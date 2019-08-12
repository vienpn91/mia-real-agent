import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import AgentAcceptRequest from '../../components/AgentAcceptRequest';
import {
  getRequestData,
  agentConfirmAction,
  isWaitingForComfirm,
  isSendingConfirmation,
} from '../../reducers/requests';
import { getUserId } from '../../reducers/auth';
import { getCurrentConveration } from '../../reducers/conversations';

const mapStateToProps = state => ({
  isOpen: isWaitingForComfirm(state),
  isConfirming: isSendingConfirmation(state),
  userId: getUserId(state),
  conversationId: getCurrentConveration(state),
  requestData: getRequestData(state),
});

const mapDispatchToProps = {
  agentConfirmAction,
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(AgentAcceptRequest);
