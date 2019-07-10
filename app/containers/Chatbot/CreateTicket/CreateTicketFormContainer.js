import { connect } from 'react-redux';
import CreateTicketForm from 'components/CreateTicket';
import { actions, selectors } from '../../../reducers/ticket';

const mapStateToProps = state => ({
  isCreating: selectors.getTicketIsCreating(state),
  createError: selectors.getTicketCreateError(state),
});

const mapDispatchToProps = {
  createTicket: actions.createAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTicketForm);
