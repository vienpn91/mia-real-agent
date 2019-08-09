import { connect } from 'react-redux';
import { selectors } from '../../reducers/requests';
import RequestTab from '../../components/RequestTab';

const mapStateToProps = state => ({
  requestList: selectors.getRequests(state),
});

export default connect(mapStateToProps)(RequestTab);
