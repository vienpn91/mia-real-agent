import { connect } from 'react-redux';
import EditTicketForm from 'components/Chatbot/EditTicket';
import { getTicketIsUpdating, getTicketUpdateError } from 'selectors/ticket';
import { actions } from '../../../reducers/ticket';

const mapStateToProps = state => ({
  isUpdating: getTicketIsUpdating(state),
  updateError: getTicketUpdateError(state),
});

const mapDispatchToProps = {
  updateTicket: actions.updateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTicketForm);
