import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import AgentAcceptRequest from '../../components/AgentAcceptRequest';
import { agentConfirmAction, isWaitingForComfirm } from '../../reducers/agents';
import { getUserId } from '../../reducers/auth';

const mapStateToProps = state => ({
  isOpen: isWaitingForComfirm(state),
  isConfirming: false,
  userId: getUserId(state),
  ticket: {
    category: [],
  },
  redirectData: {},
});

const mapDispatchToProps = {
  agentConfirmAction,
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(AgentAcceptRequest);
