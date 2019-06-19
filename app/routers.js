import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import UnauthRoute from './containers/Route/UnauthenticateRoute';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Registration from './pages/Registration';
import LoginCallBackPage from './pages/LoginCallback';
import ThankForRegistering from './pages/ThankForRegistering';
import Dashboard from './pages/Dashboard';

import ChatbotComponent from './pages/Chatbot';

export default class App extends React.PureComponent {
  render() {
    const { history } = this.props;

    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/home" component={ChatbotComponent} />
        <UnauthRoute exact path="/login" component={Login} />
        <UnauthRoute exact path="/register" component={Registration} />
        <Route exact path="/greeting" component={ThankForRegistering} />
        <Route exact path="/dashboard" component={Dashboard} />
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
