import { connect } from 'react-redux';
import Profile from '../../components/Profile';
import { actions, selectors } from '../../reducers/profile';

const mapStateToProps = state => ({
  user: selectors.getProfileFetchedProfile(state),
  isFetching: selectors.getProfileIsFetching(state),
});

const mapDispatchToProps = {
  fetchProfile: actions.fetchDetailAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
