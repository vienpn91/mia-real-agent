import { connect } from 'react-redux';
import { actions, selectors } from '../../../reducers/profile';
import ProfileForm from '../../../components/Profile/ProfileForm';
const mapStateToProps = state => ({
  user: selectors.getProfileFetchedProfile(state),
  isCheckingPassword: selectors.getProfilePasswordIsChecking(state),
  isUpdating: selectors.getProfileIsUpdating(state),
  passwordConfirmed: selectors.getProfilePasswordIsConfirmed(state),
});

const mapDispatchToProps = {
  checkPassword: actions.checkPasswordAction,
  updateProfile: actions.updateProfileAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
