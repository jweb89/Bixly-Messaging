import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  console.log('stuff', isLoggedIn);
  console.log(rest);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
export default AuthRoute;
