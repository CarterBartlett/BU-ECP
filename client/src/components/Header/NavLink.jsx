// An extension of the NavItem from "react-materialize", "href" navigates in usual way, "to" uses react router!

import React, { Component } from "react";
import { NavItem } from "react-materialize";
import { withRouter } from "react-router-dom";

class NavLink extends Component {
  render() {
    const {to, href, children} = this.props;
    if (to) {
      return <NavItem onClick={()=>this.props.history.push(to)}>{children}</NavItem>;
    } else if(href) {
      return <NavItem href={href}>{children}</NavItem>
    } else {
      return <NavItem>{children}</NavItem>
    }
  }
}

export default withRouter(NavLink);
