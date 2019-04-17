import { connect } from 'react-redux';
import ThankForRegistering from 'components/ThankForRegistering';
import { createStructuredSelector } from 'reselect';
import {
  actions,
  getVerifyingEmail,
  getIsSendingEmail,
  getResendEmailError,
} from 'reducers/auth';

const mapStateToProps = createStructuredSelector({
  verifyingEmail: getVerifyingEmail,
  isSending: getIsSendingEmail,
  error: getResendEmailError,
});

const mapDispatchToProps = {
  sendVericationEmail: actions.sendVericationEmail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThankForRegistering);
