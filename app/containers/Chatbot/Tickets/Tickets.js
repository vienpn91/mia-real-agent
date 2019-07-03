import { connect } from 'react-redux';
import Tickets from 'components/Chatbot/Tickets';
import { selectors, actions } from 'reducers/ticket';

const mapStateToProps = state => ({
  tickets: selectors.getTicketsList(state),
  fetchingContext: selectors.getFetchingContext(state),
});

const mapDispatchToProps = {
  getAllAction: actions.getAllAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
