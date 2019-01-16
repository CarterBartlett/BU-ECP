import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

// Import components
import Home from "./Home/Home";
import Header from "./Header/Header";
// import AppFooter from "./Footer/Footer";
import Requests from "./Requests/Requests";
import RequestsNew from "./Requests/RequestsNew";
import Help from "./Help/Help";

import UserList from "../components/Admin/EditUser/UserList";
import EditUser from "./Admin/EditUser/EditUser";
import RequestList from "../components/Admin/RequestList";
import EditRequest from "../components/Admin/EditRequest/EditRequest";

import NotFound404 from "./NotFound404";

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }
  render() {
    const { role } = this.props.auth || "";

    console.log("AUTH", this.props.auth);
    console.log("ROLE", role);

    let Routes = VisitorRoutes; // Start off with Visitor Routes, as visitors have the lowest route access and is shared with other users
    switch (role) {
      case "lecturer":
        Routes = AdminRoutes;
        break;
      case "student":
        Routes = UserRoutes;
        break;
      // No default
    }

    return (
      <BrowserRouter>
        <div>
          <Header />
          <div className="container">
            <Routes />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const AdminRoutes = () => {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/admin/user" component={UserList} />
      <Route exact path="/admin/request" component={RequestList} />
      <Route exact path="/admin/request/:id" component={EditRequest} />
      <Route exact path="/admin/user/edit/:id" component={EditUser} />
    </div>
  );
};

const UserRoutes = () => {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/requests" component={Requests} />
      <Route exact path="/requests/new" component={RequestsNew} />
      <Route exact path="/help" component={Help} />
    </div>
  );
};

const VisitorRoutes = () => {
  return (
    <div>
      <Route exact path="/" component={Home} />
    </div>
  );
};

const mapStateToProps = state => {
  return { auth: state.auth };
};
const mapDispatchToProps = actions;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
