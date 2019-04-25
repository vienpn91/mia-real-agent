import { connect } from 'react-redux';
import ResponseBox from '../../components/ResponseBox';
import {
  selectFieldValue,
  actions,
} from '../../reducers/trainingForm';

const mapStateToProps = state => ({
  response: selectFieldValue(state, 'response'),
  entity: selectFieldValue(state, 'entity'),
  value: selectFieldValue(state, 'value'),
  selectedText: selectFieldValue(state, 'selectedText'),
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponseBox);
