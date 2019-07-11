import { connect } from 'react-redux';
import { actions } from 'reducers/admin';
import LeftSideBar from 'components/LeftSideBar';
import { toggleLeftSideBar } from 'selectors/admin';

const mapStateToProps = state => ({
  toggleLeftSideBar: toggleLeftSideBar(state),
});


const mapDispatchToProps = {
  handleToggle: actions.handleToggle,
};


export default connect(mapStateToProps, mapDispatchToProps)(LeftSideBar);
