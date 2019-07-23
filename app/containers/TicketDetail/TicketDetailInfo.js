import TicketDetailInfo from 'components/TicketDetail/TicketDetailInfo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'reducers/ticket';
import { getTicketDetailFromRoute, getTicketIdFromRoute } from 'selectors/ticket';

const mapStateToProps = createStructuredSelector({
  ticketDetail: getTicketDetailFromRoute,
  ticketId: getTicketIdFromRoute,
});

const mapDispatchToProps = {
  fetchTicketSingle: actions.fetchTicketSingle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicketDetailInfo);
