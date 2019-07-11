import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TicketTab from 'components/TicketTab';
import { getTicketTotalRecord } from 'selectors/ticket';
import { actions } from 'reducers/ticket';
import { compose } from 'redux';

const mapStateToProps = state => ({
  totalRecord: getTicketTotalRecord(state),
});

const mapDispatchToProps = {
  getAllAction: actions.getAllAction,
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(TicketTab);
