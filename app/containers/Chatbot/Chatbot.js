import { connect } from 'react-redux';
import Chatbot from '../../components/Chatbot';
import { actions, selectors } from '../../reducers/ticket';

const mapStateToProps = state => ({
  ticketDetail: selectors.getTicketGetTicketDetail(state),
});

const mapDispatchToProps = {
  getTicket: actions.getAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatbot);
