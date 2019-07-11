import { connect } from 'react-redux';
import CreateTicketForm from 'components/CreateTicket';
import { getTicketIsCreating, getTicketCreateError } from 'selectors/ticket';
import { actions } from '../../../reducers/ticket';

const mapStateToProps = state => ({
  isCreating: getTicketIsCreating(state),
  createError: getTicketCreateError(state),
});

const mapDispatchToProps = {
  createTicket: actions.createAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTicketForm);
