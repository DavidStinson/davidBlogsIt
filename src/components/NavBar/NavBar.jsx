import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { Menu, Container } from "semantic-ui-react"
import NavUtility from "../common/utility/NavUtility"

const NavBar = ({user, handleLogout}) => {
  let nav = user ? (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as={NavUtility} to="/" name="Home">Home</Menu.Item>
        </Container>
      </Menu>
      {user.isAdmin && (<NavLink to="/new-post" className="NavBar-link">
        Click here to make a post!!
      </NavLink>)}
      <NavLink to="" className="NavBar-link" onClick={handleLogout}>
        Logout
      </NavLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <span className="NavBar-welcome">Welcome, {user.name}</span>
    </div>
  ) : (
    <div>
      <NavLink to="/login" className="NavBar-link">
        Login
      </NavLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <NavLink to="/signup" className="NavBar-link">
        Sign up
      </NavLink>
    </div>
  );

  return <div className="NavBar">{nav}</div>;
};

export default NavBar;
