import React, { Component } from "react";
import { Card, Col } from "react-materialize";
import moment from "moment";

class RequestCard extends Component {
  render() {
    const {
      id,
      name,
      attachedForm,
      status,
      createdOn,
      lastUpdated
    } = this.props;
    return (
      <Col s={6} key={id}>
        <Card
          title={name}
          actions={[
            <a
              key="1"
              href={`/api/requests/form/?filename=${attachedForm}`}
              className="teal-text"
            >
              Download my Form
            </a>
          ]}
        >
          <p>
            <b className="teal-text">Status:</b> {status}
          </p>
          <p>Created {moment(createdOn).fromNow()}</p>
          <br />
          {lastUpdated ? (
            <p>
              Updated {moment(lastUpdated.on).fromNow()} by {lastUpdated._by}
            </p>
          ) : (
            ""
          )}
        </Card>
      </Col>
    );
  }
}

export default RequestCard;
