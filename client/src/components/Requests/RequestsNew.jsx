import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { Button, Row, Icon, Card, CardTitle } from "react-materialize";
import CustomFormField from "../../utils/redux-form/FormField";
import fields from "./requestsNewFields";
import { createNewRequest, fetchLecturers } from "../../actions";
import _ from "lodash";

class RequestsNew extends Component {
  renderImportantNoteCard() {
    return (
      <Card
        header={
          <CardTitle
            className="card-content card-title white-text"
            style={{
              paddingBottom: "0px",
              paddingTop: "0px",
              marginBottom: "0px"
            }}
            image=""
          >
            Important
          </CardTitle>
        }
        textClassName="white-text"
        className="orange darken-2 white-text"
        actions={[
          <a
            key="board_consideration"
            className="white-text"
            href="/docs/6J-Board-Consideration-request-form-2018.docx"
          >
            Board Consideration Request Form
          </a>,
          <a
            key="extension_request"
            className="white-text"
            href="/docs/6J-Extension-request-form-2018.docx"
          >
            Extension Request Form
          </a>
        ]}
      >
        Please note that you will be required to fill out a mitigating
        circumstances form. Please select the most relevant form from the links
        below.
      </Card>
    );
  }
  renderFormFields() {
    return fields.map(field => {
      const { name, type, validators, label, size, options } = field;

      let lecturersArray = [];
      if (this.props.lecturers) {
        lecturersArray = this.props.lecturers.map(lec => {
          return { name: `${lec.firstName} ${lec.lastName}`, value: lec.id };
        });
      }

      const opt =
        options && lecturersArray
          ? [...options, ...lecturersArray]
          : options
          ? options
          : lecturersArray
          ? lecturersArray
          : []; // Merges the "options" and "lecturersArray". There's probably a better way to do it's late so. So TODO: Make this less of an eyesore

      return (
        <Field
          type={type}
          key={name}
          component={CustomFormField}
          name={name}
          label={label}
          size={size}
          options={opt}
          validators={validators}
        />
      );
    });
  }
  submitForm(values) {
    const { createNewRequest, history } = this.props;
    createNewRequest(values, history, res => {
      if (res.error) {
        window.Materialize.toast(res.error, 1000);
      } else {
        window.Materialize.toast("Created request!", 1000);
      }
    });
  }
  componentDidMount() {
    this.props.fetchLecturers();
  }
  render() {
    const { handleSubmit, history, submitting, invalid, pristine } = this.props;
    return (
      <div>
        <form
          onKeyPress={e => {
            if (e.key === "Enter") e.preventDefault();
          }}
        >
          <Row>{this.renderImportantNoteCard()}</Row>
          <Row>{this.renderFormFields()}</Row>
          <Row>
            <Button
              waves="light"
              className="left red"
              onClick={() => history.push("/requests")}
            >
              <Icon left>cancel</Icon>Cancel
            </Button>
            <Button
              waves="light"
              className="right green"
              onClick={handleSubmit(values => this.submitForm(values))}
              disabled={submitting || invalid || pristine}
            >
              <Icon right>send</Icon>Submit Request
            </Button>
          </Row>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(fields, field => {
    const {
      name,
      validators: { required, allowedTypes }
    } = field;
    const value = values[name];

    if (allowedTypes) {
      const filename = value ? value.name : "";
      const extension = filename.substr(
        filename.lastIndexOf("."),
        filename.length
      );
      if (allowedTypes.indexOf(extension) === -1) {
        errors[name] = "Invalid filetype provided!";
      }
    }

    if (required) {
      if (!value) {
        errors[name] = "Please provide a value!";
      }
    }
  });

  return errors;
}

const mapStateToProps = state => {
  return { lecturers: state.users.lecturers };
};
const mapDispatchToProps = { createNewRequest, fetchLecturers };

const RequestsNewReduxForm = reduxForm({ form: "requestsNewForm", validate })(
  RequestsNew
);
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RequestsNewReduxForm)
);
