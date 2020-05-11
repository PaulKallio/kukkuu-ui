import React, { FunctionComponent } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { isAuthenticatedSelector } from '../state/AuthenticationSelectors';
import { StoreState } from '../../app/types/AppTypes';
import { loginTunnistamo } from '../authenticate';

interface AuthProps {
  isAuthenticated: boolean;
}
export type PrivateRouteProps = RouteProps & AuthProps;

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  isAuthenticated,
  children,
  location,
  ...rest
}) => {
  const justLoggedOutCookie = document.cookie
    .split(';')
    .some((item) => item.includes('loggedOut=1'));
  if (!justLoggedOutCookie && !isAuthenticated) {
    // If user opens an invitation link from an email, we want to log them in and
    // redirect to the invitation.
    loginTunnistamo(location?.pathname);
  }

  document.cookie = 'loggedOut=0';
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: `/home`,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const UnconnectedPrivateRoute = PrivateRoute;

const mapStateToProps = (state: StoreState) => ({
  isAuthenticated: isAuthenticatedSelector(state),
});

export { UnconnectedPrivateRoute };
export default connect(mapStateToProps)(PrivateRoute);
