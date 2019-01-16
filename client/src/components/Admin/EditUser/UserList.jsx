import React, { Component } from "react";
import { fetchUsers } from "../../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Button, Icon } from "react-materialize";

class UserList extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }
  renderUserTableRows() {
    if (!this.props.users) {
      return;
    } else {
      return this.props.users.map(user => {
        return (
          <tr key={user.id}>
            <td>{user.role}</td>
            <td>{user.referenceNumber}</td>
            <td>{user.username}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>
              <Link to={"/admin/user/edit/" + user.id}>
                <Button waves="light" icon="mode_edit" />
              </Link>
            </td>
          </tr>
        );
      });
    }
  }
  renderUserTable() {
    return (
      <Table hoverable={true}>
        <thead>
          <tr>
            <th>Role</th>
            <th>Reference Number</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th />
          </tr>
        </thead>
        <tbody>{this.renderUserTableRows()}</tbody>
      </Table>
    );
  }
  render() {
    return (
      <div>
        {this.renderUserTable()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const users = state.users.list;
  return { users };
}
const mapDispatchToProps = { fetchUsers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
