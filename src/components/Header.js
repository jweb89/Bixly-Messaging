import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, logoutUser }) {
  return isLoggedIn ? (
    <nav className="navbar navbar-dark bg-secondary mb-2 justify-content-around">
      <button className="btn navbar-brand" type="button" onClick={logoutUser}>
        Logout
      </button>

      <Link to="/inbox" className="navbar-brand">
        Inbox
      </Link>

      <Link to="/sent" className="navbar-brand">
        Sent
      </Link>
    </nav>
  ) : null;
}

export default Header;
