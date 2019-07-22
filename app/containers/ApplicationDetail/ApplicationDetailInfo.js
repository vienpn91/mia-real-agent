import ApplicationDetailInfo from 'components/ApplicationDetail/ApplicationDetailInfo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'reducers/application';
import { getApplicationDetailFromRoute, getApplicationIdFromRoute } from 'selectors/application';

const mapStateToProps = createStructuredSelector({
  applicationDetail: getApplicationDetailFromRoute,
  applicationId: getApplicationIdFromRoute,
});

const mapDispatchToProps = {
  fetchApplicationSingle: actions.fetchApplicationSingle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicationDetailInfo);
