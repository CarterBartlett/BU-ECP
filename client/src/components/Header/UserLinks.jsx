import React from "react";
import NavLink from "./NavLink";

const UserLinks = () => {
  return [
    <NavLink key="home" to="/">
      Home
    </NavLink>,
    <NavLink key="requests" to="/requests">
      My Requests
    </NavLink>,
    <NavLink key="help" to="/help">
      Help
    </NavLink>,
    <NavLink key="logout" href="/api/logout">
      Log Out
    </NavLink>
  ];
};

export default UserLinks;
