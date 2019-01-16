import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar, Row } from "react-materialize";

import NavLink from "./NavLink";

import AdminLinks from "./AdminLinks";
import UserLinks from "./UserLinks";
import VisitorLinks from "./VisitorLinks";

class Header extends Component {
  renderNavbarItems() {
    const { role } = this.props.auth || "";

    switch (role) {
      case "student":
        return <UserLinks/>;
      case "lecturer":
        return <AdminLinks/>;
      default:
        return <VisitorLinks/>;
    }
  }

  render() {
    const { firstName, lastName } = this.props.auth || "";
    return (
      <Row>
        <Navbar
          className="teal"
          brand="BU Exceptional Circumstances Portal"
          right
        >
          {this.renderNavbarItems()}
        </Navbar>
        <Row
          className="teal darken-1 white-text"
          style={{ height: "30px", width: "100%" }}
        >
          <p style={{ margin: "4px 12px" }} className="right">
            {this.props.auth
              ? `Currently logged in as ${firstName} ${lastName}`
              : ""}
          </p>
        </Row>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return { auth };
}

export default connect(mapStateToProps)(Header);
