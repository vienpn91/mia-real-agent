import { connect } from 'react-redux';
import { selectors, actions } from '../../reducers/application';
import ApplicationForm from '../../components/Application';

const mapStateToProps = state => ({
  isSubmitting: selectors.getApplicationIsSubmitting(state),
  submitError: selectors.getApplicationSubmitError(state),
});

const mapDispatchToProps = {
  onSubmit: actions.submitAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationForm);
