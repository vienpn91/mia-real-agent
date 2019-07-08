import { connect } from 'react-redux';
import EditTicketForm from 'components/Chatbot/EditTicket';
import { actions, selectors } from '../../../reducers/ticket';

const mapStateToProps = state => ({
  isUpdating: selectors.getTicketIsUpdating(state),
  updateError: selectors.getTicketUpdateError(state),
});

const mapDispatchToProps = {
  updateTicket: actions.updateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTicketForm);
