import { connect } from 'react-redux';
import { selectors } from '../../reducers/requests';
import RequestList from '../../components/RequestTab/RequestList';

const mapStateToProps = state => ({
  requestList: selectors.getRequestList(state),
});

export default connect(mapStateToProps)(RequestList);
