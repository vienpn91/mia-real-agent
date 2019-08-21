import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { getTicketsList, getFetchingContext } from '../../../selectors/ticket';
import Ticket from '../../../components/TicketTab/Ticket';

const mapStateToProps = state => ({
  ticketList: getTicketsList(state),
  fetchingContext: getFetchingContext(state),
});

export default withTranslation()(connect(mapStateToProps)(Ticket));
