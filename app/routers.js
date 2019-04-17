import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthRoute from './containers/Route/AuthenticatedRoute';
import UnauthRoute from './containers/Route/UnauthenticateRoute';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import LoginCallBackPage from './pages/LoginCallback';


export default class App extends React.PureComponent {
  render() {
    const { history } = this.props;

    return (
      <Switch>
        <AuthRoute exact path="/" component={HomePage} />
        <UnauthRoute exact path="/login" component={Login} />
        <Route
          path="/login/callback/:token/:userId/:email/:verifiedAt"
          component={LoginCallBackPage}
        />
      </Switch>
    );
  }
}

App.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
