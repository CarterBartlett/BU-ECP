import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon, Row } from "react-materialize";
import { withRouter } from "react-router-dom";
import { fetchRequests } from "../../actions";
import RequestCard from "./RequestCard";

class Requests extends Component {
  componentDidMount() {
    this.props.fetchRequests();
  }
  renderCards() {
    if (!this.props.requests) return;

    return this.props.requests.map(request => {
      return <RequestCard key={request.id} {...request} />;
    });
  }
  render() {
    return (
      <div>
        <Row>
          <Button
            waves="light"
            onClick={() => {
              this.props.history.push("/requests/new");
            }}
          >
            <Icon left>add</Icon>New Request
          </Button>
        </Row>
        <Row>{this.renderCards()}</Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { requests: state.requests.list };
};
const mapDispatchToProps = { fetchRequests };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Requests)
);
