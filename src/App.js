import React, { useState, useEffect } from 'react';
import { Route, withRouter, Switch, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Login from './components/Login';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import AuthRoute from './utils/AuthRoute';

const App = ({ history }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const tryLocalSignin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} logoutUser={logoutUser} />
      <div className="container">
        <Switch>
          <Route
            render={() => (
              <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            )}
            path="/"
            exact
          />
          <>
            <AuthRoute
              path="/sent"
              isLoggedIn={isLoggedIn}
              component={MessageList}
              exact
            />
            <AuthRoute
              path="/inbox"
              isLoggedIn={isLoggedIn}
              component={MessageList}
              exact
            />
            <MessageForm />
          </>
        </Switch>
        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};

export default withRouter(App);
