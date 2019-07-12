import UserDetailInfo from 'components/UserDetail/UserDetailInfo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'reducers/user';
import { getUserDetailFromRoute, getUserIdFromRoute } from 'selectors/user';

const mapStateToProps = createStructuredSelector({
  userDetail: getUserDetailFromRoute,
  userId: getUserIdFromRoute,
});

const mapDispatchToProps = {
  fetchUserSingle: actions.fetchUserSingle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDetailInfo);
