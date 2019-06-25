import { connect } from 'react-redux';
import ChangePasswordForm from '../../../components/Profile/ChangePasswordForm';
import { actions } from '../../../reducers/profile';

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
  handleSubmit: actions.changePasswordAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);
