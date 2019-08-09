import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { ROLES } from '../../../../common/enums';

const AdminRoute = ({
  authenticated,
  userRole,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      const toUnauthenticatedObj = {
        pathname: '/login',
        state: { from: props.location },
      };

      const toUnauthorizedObj = {
        pathname: '/dashboard',
        state: { from: props.location },
      };
      if (authenticated) {
        if (userRole !== ROLES.ADMIN) return <Redirect to={toUnauthorizedObj} />;
        return <Component {...props} authenticated />;
      }
      if (!authenticated) return <Redirect to={toUnauthenticatedObj} />;

      return <Redirect to="/error/404" />;
    }}
  />
);

AdminRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  userRole: PropTypes.string,
  component: PropTypes.any,
  location: PropTypes.any,
};

export default AdminRoute;
