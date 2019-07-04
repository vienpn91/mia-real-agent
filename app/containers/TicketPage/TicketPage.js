import { connect } from 'react-redux';
import TicketPage from 'components/TicketPage';
import { actions, selectors } from 'reducers/ticket';

const mapStateToProps = state => ({
  totalRecord: selectors.getTicketTotalRecord(state),
});

const mapDispatchToProps = {
  getAllAction: actions.getAllAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketPage);
