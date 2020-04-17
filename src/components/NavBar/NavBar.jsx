import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({user, handleLogout}) => {
  let nav = user ? (
    <div>
      {user.isAdmin && (<Link to="/new-post" className="NavBar-link">
        Click here to make a post!!
      </Link>)}
      <Link to="" className="NavBar-link" onClick={handleLogout}>
        Logout
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <span className="NavBar-welcome">Welcome, {user.name}</span>
    </div>
  ) : (
    <div>
      <Link to="/login" className="NavBar-link">
        Login
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to="/signup" className="NavBar-link">
        Sign up
      </Link>
    </div>
  );

  return <div className="NavBar">{nav}</div>;
};

export default NavBar;
