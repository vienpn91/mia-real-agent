/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Switch } from 'react-router-dom';
import AuthenticatedRoute from 'containers/Route/AuthenticatedRoute';
import MainLayout from 'components/MainLayout';
import UnauthRoute from './containers/Route/UnauthenticateRoute';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Registration from './pages/Registration';
import LoginCallBackPage from './pages/LoginCallback';
import ThankForRegistering from './pages/ThankForRegistering';
import Profile from './pages/Profile';
import ChatbotComponent from './pages/Chatbot';


export default class App extends React.PureComponent {
  render() {
    return (
      <Switch>
        <UnauthRoute exact path="/" component={HomePage} />
        <UnauthRoute exact path="/login" component={Login} />
        <UnauthRoute exact path="/register" component={Registration} />
        <UnauthRoute exact path="/greeting" component={ThankForRegistering} />
        <UnauthRoute
          path="/login/callback/:token/:userId/:email/:verifiedAt"
          component={LoginCallBackPage}
        />
        <AuthenticatedRoute exact path="/ticket/:id" component={ChatbotComponent} />
        <MainLayout>
          <Switch>
            <AuthenticatedRoute exact path="/profile" component={Profile} />
            <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </MainLayout>
      </Switch>
    );
  }
}
