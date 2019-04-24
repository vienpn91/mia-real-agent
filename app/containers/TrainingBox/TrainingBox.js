import { connect } from 'react-redux';
import TrainingBox from '../../components/TrainingBox';
import {
  selectFieldValue,
  actions,
} from '../../reducers/trainingForm';

const mapStateToProps = state => ({
  userSay: selectFieldValue(state, 'userSay'),
  intent: selectFieldValue(state, 'intent'),
  entities: selectFieldValue(state, 'entities'),
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrainingBox);
