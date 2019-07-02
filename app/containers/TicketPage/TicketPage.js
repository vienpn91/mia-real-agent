import { connect } from 'react-redux';
import TicketPage from 'components/TicketPage';
import { actions } from 'reducers/ticket';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  getAllAction: actions.getAllAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketPage);
