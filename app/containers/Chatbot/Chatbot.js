import { connect } from 'react-redux';
import _get from 'lodash/get';
import { getTicketGetTicketDetail, getTicketGetTicketIsGetting, getTicketGetTicketError } from 'selectors/ticket';
import Chatbot from '../../components/Chatbot';
import { actions } from '../../reducers/ticket';
import { getUserId, getUserRole } from '../../reducers/auth';

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps;
  const id = _get(match, 'params.id', null);
  let owner = _get(match, 'params.owner', null);
  if (!owner) {
    owner = getUserId(state);
  }
  return {
    isGetting: getTicketGetTicketIsGetting(state),
    userRole: getUserRole(state),
    ticketDetail: getTicketGetTicketDetail(state, id, owner),
    getError: getTicketGetTicketError(state),
  };
};

const mapDispatchToProps = {
  getTicket: actions.getAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatbot);
