import React from "react";
import { NavLink } from "react-router-dom";

const NavUtility = (props) => (
  <NavLink exact {...props} activeClassName="active blue" />
);

export default NavUtility;
