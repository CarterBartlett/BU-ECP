import React, { Component } from "react";
import { Card, Col } from "react-materialize";

class QA extends Component {
  render() {
    const { question, s = 12, m = 4 } = this.props;
    const answer = this.props.children;
    return (
        <div class={`col s${s} m${m}`}>
          <div class="card-panel teal">
            <span class="white-text">
            <h5 style={{margin:"0px"}}>{question}</h5><br/>
              {answer}
            </span>
          </div>
        </div>
    );
  }
}

export default QA;
