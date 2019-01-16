import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllRequests } from "../../actions";
import { Table, Icon, Button } from "react-materialize";
import moment from "moment";

class RequestList extends Component {
  componentDidMount() {
    this.props.fetchAllRequests();
  }
  renderTableContents() {
    if (!this.props.requests) return;
    return this.props.requests.map(row => {
      const dateCreated = moment(row.createdOn);
      return (
        <tr>
          <td>
            {row._owner.firstName} {row._owner.lastName}
          </td>
          <td>{dateCreated.format("Do MMMM YYYY HH:MM")}</td>
          <td />
          <td />
          <td>
            <a href={`/admin/request/${row.id}`}>
              <Button icon="visibility" />
            </a>
            <a href={`/api/requests/form/?filename=${row.attachedForm}`}>
              <Button icon="file_download" />
            </a>
          </td>
        </tr>
      );
    });
  }
  render() {
    return (
      <Table hoverable>
        <thead>
          <tr>
            <th>Created By</th>
            <th>Created On</th>
            <th>Last Updated By</th>
            <th>Last Updated On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{this.renderTableContents()}</tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => {
  return { requests: state.requests.list };
};
const mapDispatchToProps = { fetchAllRequests };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestList);
