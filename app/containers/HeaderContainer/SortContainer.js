import { connect } from 'react-redux';
import { actions } from 'reducers/modal';
import SortContainer from 'components/HeaderContainer/SortContainer';

const mapDispatchToProps = {
  openModal: actions.openModal,
};

export default connect(
  null,
  mapDispatchToProps,
)(SortContainer);
