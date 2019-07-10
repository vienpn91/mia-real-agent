/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthenticatedRoute from 'containers/Route/AuthenticatedRoute';
import MainLayout from 'components/MainLayout';
import AdminMainLayout from 'containers/AdminMainLayout';
import UserManagement from 'containers/UserManagement';
import UnauthRoute from './containers/Route/UnauthenticateRoute';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Registration from './pages/Registration';
import LoginCallBackPage from './pages/LoginCallback';
import ThankForRegistering from './pages/ThankForRegistering';
import Profile from './pages/Profile';
import ChatbotComponent from './pages/Chatbot';
import TicketManagement from './pages/TicketManagement';

import AdminDashboard from './pages/AdminDashboard';
import { RegistrationIndividual, RegistrationBusiness } from './containers/Registration';
import ApplicationForm from './components/Application';

export default class App extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/admin">
          <AdminMainLayout>
            <AuthenticatedRoute exact path="/admin/dashboard" component={AdminDashboard} />
            <AuthenticatedRoute exact path="/admin/tickets" component={TicketManagement} />
            <AuthenticatedRoute exact path="/admin/user" component={UserManagement} />
          </AdminMainLayout>
        </Route>
        <UnauthRoute exact path="/" component={HomePage} />
        <UnauthRoute exact path="/login" component={Login} />
        <UnauthRoute exact path="/register" component={Registration} />
        <UnauthRoute exact path="/register/individual" component={RegistrationIndividual} />
        <UnauthRoute exact path="/register/business" component={RegistrationBusiness} />
        <UnauthRoute exact path="/greeting" component={ThankForRegistering} />
        <UnauthRoute exact path="/application" component={ApplicationForm} />
        <UnauthRoute
          path="/login/callback/:token/:userId/:email/:verifiedAt"
          component={LoginCallBackPage}
        />
        <AuthenticatedRoute exact path="/ticket/:id?/:owner?" component={ChatbotComponent} />
        <MainLayout>
          <Switch>
            <AuthenticatedRoute exact path="/profile" component={Profile} />
            <AuthenticatedRoute exact path="/dashboard/:tab?/:page?" component={Dashboard} />
          </Switch>
        </MainLayout>
      </Switch>
    );
  }
}
