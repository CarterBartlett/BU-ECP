import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRequest } from "../../../actions";
import { Button, Icon, Row } from "react-materialize";
import { Link } from "react-router-dom";
import { updateRequest } from "../../../actions";

class EditRequest extends Component {
  componentDidMount() {
    this.props.fetchRequest(this.props.match.params.id);
  }
  changeStatus(newStatus) {
    console.log('ChangeStatus', {newStatus})
    const { id } = this.props.request;
    this.props.updateRequest(id, {status: newStatus}, (res) => {
      if (res.error) {
        window.Materialize.toast(res.error, 1000);
      } else {
        window.Materialize.toast("Status updated!", 1000);
      }
    })
  }
  renderPageContent() {
    const { request } = this.props;
    let ownerFirstName,
      ownerLastName,
      ownerId,
      unitLeaderFirstName,
      unitLeaderLastName,
      unitLeaderId = "";
    if (request.unitLeader) {
      unitLeaderId = request.unitLeader.id;
      unitLeaderFirstName = request.unitLeader.firstName;
      unitLeaderLastName = request.unitLeader.lastName;
    }
    if (request._owner) {
      ownerId = request._owner.id;
      ownerFirstName = request._owner.firstName;
      ownerLastName = request._owner.lastName;
    }
    return (
      <div>
        <Link to="/admin/request">
          <Button className="red">
            <Icon left>keyboard_arrow_left</Icon>Go Back
          </Button>
        </Link>
        <h4>
          Exceptional Circumstances request for {ownerFirstName || ""}{" "}
          {ownerLastName || ""}
        </h4>
        <p>
          <b>Current status:</b> {request.status}
        </p>
        <p>
          <b>Unit leader:</b> {unitLeaderFirstName || ""}{" "}
          {unitLeaderLastName || ""}
        </p>
        <a href={`/api/requests/form?filename=${request.attachedForm}`}>
          <Button>Download Form</Button>
        </a>
        <h5>Set Status</h5>
        <Row>
          <Button className="blue" onClick={()=>this.changeStatus("Submitted")}>Submitted</Button>
          <Button className="orange" onClick={()=>this.changeStatus("Under Review")}>Under Review</Button>
          <Button className="green" onClick={()=>this.changeStatus("Accepted")}>Accepted</Button>
          <Button className="red" onClick={()=>this.changeStatus("Rejected")}>Rejected</Button>
        </Row>
      </div>
    );
  }
  render() {
    const req = this.props.request || false;
    if (req) {
      return <div>{this.renderPageContent()}</div>;
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => {
  return { request: state.requests.selected };
};
const mapDispatchToProps = { fetchRequest, updateRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRequest);
