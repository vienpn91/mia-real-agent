import React from 'react';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthRoute from './containers/Route/AuthenticatedRoute';
import UnauthRoute from './containers/Route/UnauthenticateRoute';
import HomePage from './pages/HomePage';
import Login from './pages/Login';


export default class App extends React.PureComponent {
  render() {
    const { history } = this.props;

    return (
      <Switch>
        <AuthRoute exact path="/" component={HomePage} />
        <UnauthRoute exact path="/login" component={Login} />
      </Switch>
    );
  }
}

App.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
