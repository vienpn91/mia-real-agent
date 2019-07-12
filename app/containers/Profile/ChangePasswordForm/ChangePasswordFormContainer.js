import { connect } from 'react-redux';
import ChangePasswordForm from '../../../components/Profile/ChangePasswordForm';
import { actions, selectors } from '../../../reducers/profile';

const mapStateToProps = state => ({
  isChangingPassword: selectors.getProfilePasswordIsChanging(state),
  changePasswordError: selectors.getProfilePasswordChangeError(state),
});

const mapDispatchToProps = {
  handleSubmit: actions.changePasswordAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);
