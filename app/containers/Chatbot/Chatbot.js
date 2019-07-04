import { connect } from 'react-redux';
import _get from 'lodash/get';
import Chatbot from '../../components/Chatbot';
import { actions, selectors } from '../../reducers/ticket';

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps;
  const id = _get(match, 'params.id', null);
  const owner = _get(match, 'params.owner', null);

  return {
    ticketDetail: selectors.getTicketGetTicketDetail(state, id, owner),
  };
};

const mapDispatchToProps = {
  getTicket: actions.getAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatbot);
