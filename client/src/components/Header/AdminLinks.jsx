import React from "react";
import NavLink from "./NavLink";

const AdminLinks = () => {
  return [
    <NavLink key="home" to="/">
      Home
    </NavLink>,
    <NavLink key="admin" to="/admin/user">
      Manage Users
    </NavLink>,
    <NavLink key="help" to="/admin/request">
      Manage Requests
    </NavLink>,
    <NavLink key="logout" href="/api/logout">
      Log Out
    </NavLink>
  ];
};

export default AdminLinks;
