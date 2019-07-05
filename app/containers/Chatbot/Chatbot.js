import { connect } from 'react-redux';
import _get from 'lodash/get';
import Chatbot from '../../components/Chatbot';
import { actions, selectors } from '../../reducers/ticket';
import { getUserId, getUserRole } from '../../reducers/auth';

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps;
  const id = _get(match, 'params.id', null);
  let owner = _get(match, 'params.owner', null);
  if (!owner) {
    owner = getUserId(state);
  }
  return {
    isGetting: selectors.getTicketGetTicketIsGetting(state),
    userRole: getUserRole(state),
    ticketDetail: selectors.getTicketGetTicketDetail(state, id, owner),
    getError: selectors.getTicketGetTicketError(state),
  };
};

const mapDispatchToProps = {
  getTicket: actions.getAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatbot);
