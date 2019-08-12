import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTicketTotalRecord } from 'selectors/ticket';
import { getAllTicketAction } from 'reducers/ticket';
import { compose } from 'redux';
import TicketTab from '../../components/TicketTab';
import { getUserRole } from '../../reducers/auth';

const mapStateToProps = state => ({
  totalRecord: getTicketTotalRecord(state),
  userRole: getUserRole(state),
});

const mapDispatchToProps = {
  getAllTicketAction,
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(TicketTab);
