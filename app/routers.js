import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import HomePage from './pages/HomePage';


export default class App extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    );
  }
}

App.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
