import React from "react";
import { Container, Menu } from "semantic-ui-react";
import NavUtility from "../common/utility/NavUtility";

const NavBar = ({ user, handleLogout }) =>
  user ? (
    <Menu inverted fixed="top">
      <Menu inverted pointing secondary fixed="top">
        <Container>
          <Menu.Item as={NavUtility} to="/" name="Home">
            Home
          </Menu.Item>
          {user.isAdmin && (
            <Menu.Item as={NavUtility} to="/new-post" name="NewPost">
              New Post
            </Menu.Item>
          )}
          {user.isAdmin && (
            <Menu.Item as={NavUtility} to="/topics" name="Topics">
              Topics
            </Menu.Item>
          )}
          <Menu.Item as={NavUtility} to="/user" name="User" position="right">
            {user.name}
          </Menu.Item>
          <Menu.Item as={NavUtility} to="/login" onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Container>
      </Menu>
    </Menu>
  ) : (
    <Menu inverted fixed="top">
      <Menu inverted pointing secondary fixed="top">
        <Container>
          <Menu.Item as={NavUtility} to="/" name="Home">
            Home
          </Menu.Item>
          <Menu.Item as={NavUtility} to="/login" name="Login" position="right">
            Login
          </Menu.Item>
          <Menu.Item as={NavUtility} to="/signup" name="Signup">
            Sign up
          </Menu.Item>
        </Container>
      </Menu>
    </Menu>
  );

export default NavBar;
