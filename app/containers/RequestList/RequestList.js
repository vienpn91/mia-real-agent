import { connect } from 'react-redux';
import { selectors, actions } from '../../reducers/requests';
import RequestList from '../../components/RequestTab/RequestList';

const mapStateToProps = state => ({
  requestList: selectors.getRequestList(state),
});

const mapDispatchToProps = {
  onAccept: (conversationId, ticketId) => actions.agentConfirmAction(conversationId, ticketId, true),
  onCancel: (conversationId, ticketId) => actions.agentConfirmAction(conversationId, ticketId, false),
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestList);
