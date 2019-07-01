import React from 'react';
import { Switch, Route } from 'react-router-dom';
<<<<<<< HEAD
<<<<<<< HEAD
import AuthenticatedRoute from 'containers/Route/AuthenticatedRoute';
=======
import MainLayout from 'components/MainLayout';
>>>>>>> Top Navbar only display in dashboard and ticket page
=======
>>>>>>> Change link of item in TopNavBar
import UnauthRoute from './containers/Route/UnauthenticateRoute';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Registration from './pages/Registration';
import LoginCallBackPage from './pages/LoginCallback';
import ThankForRegistering from './pages/ThankForRegistering';
import Profile from './pages/Profile';
import ChatbotComponent from './pages/Chatbot';
import TicketPage from './pages/TicketPage';


export default class App extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
<<<<<<< HEAD
=======
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/ticket" component={TicketPage} />
        <Route path="/ticket/:id?" component={ChatbotComponent} />
>>>>>>> Change link of item in TopNavBar
        <UnauthRoute exact path="/login" component={Login} />
        <UnauthRoute exact path="/register" component={Registration} />
        <Route exact path="/greeting" component={ThankForRegistering} />
        <Route exact path="/profile" component={Profile} />
        <Route
          path="/login/callback/:token/:userId/:email/:verifiedAt"
          component={LoginCallBackPage}
        />
        <MainLayout>
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/ticket" component={TicketPage} />
            <Route exact path="/ticket/:id?" component={ChatbotComponent} />
          </Switch>
        </MainLayout>
      </Switch>
    );
  }
}
