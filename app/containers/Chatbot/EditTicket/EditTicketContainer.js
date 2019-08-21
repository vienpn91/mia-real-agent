import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(EditTicketForm));
