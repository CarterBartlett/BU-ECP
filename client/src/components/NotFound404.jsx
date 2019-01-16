import React, { Component } from "react";
import { Button } from "react-materialize";
import { withRouter } from "react-router-dom";

class NotFound404 extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h4>
          <b className="teal-text">404:</b> Not Found
        </h4>
        <Button
          large
          className="teal"
          onClick={() => {
            history.push("/");
          }}
        >
          Return to Home
        </Button>
      </div>
    );
  }
}

export default withRouter(NotFound404);
