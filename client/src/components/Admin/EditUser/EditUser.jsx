import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { fetchUser, updateUser, fetchCurrentUser } from "../../../actions";
import EditUserField from "./EditUserFormField";
import fields from "./editUserFields";
import { Button, Row, Icon } from "react-materialize";
import _ from "lodash";
import { withRouter } from "react-router-dom";

class EditUser extends Component {
  componentDidMount() {
    this.props.load(this.props.match.params.id); // Load values into current form
  }
  renderFormFields() {
    return _.map(fields, field => {
      const {
        name,
        label,
        placeholder,
        type,
        validators,
        helperText,
        options,
        size
      } = field;
      return (
        <Field
          key={name}
          name={name}
          component={EditUserField}
          type={type}
          placeholder={placeholder}
          label={label}
          helperText={helperText}
          options={options}
          validators={validators}
          size={size}
        />
      );
    });
  }
  submitForm(values) {
    const { id } = values;
    const editFields = fields.map(v => {
      return v.name;
    }); //Get a list of the fields that were actually visible on the form

    const updateProps = _(values)
      .omitBy((v, k) => {
        return editFields.indexOf(k) === -1;
      }) // Create an object with only props we want to update
      .value();

      const userId = values.id;
      const currentUserId = this.props.auth.id;
    // Create a pretty little message informing that the user has been saved
    this.props.updateUser(id, updateProps, this.props.history, res => {
      if (res.error) {
        window.Materialize.toast(res.error, 1000);
      } else {
        window.Materialize.toast("User updated!", 1000);
        if (userId == currentUserId) {
          this.props.fetchCurrentUser();
        }
      }
    });
  }
  render() {
    const { submitting, handleSubmit, invalid, pristine } = this.props;
    return (
      <div>
        <form
          onKeyPress={e => {
            if (e.key === "Enter") e.preventDefault();
          }}
        >
          <Row>{this.renderFormFields()}</Row>
          <Row>
            <Button
              onClick={() => this.props.history.push("/admin/user")}
              className="left red"
            >
              <Icon left>cancel</Icon>Cancel
            </Button>
            <Button
              type="submit"
              className="right green"
              disabled={submitting || pristine || invalid}
              onClick={handleSubmit(values => this.submitForm(values))}
            >
              <Icon left>save</Icon>Save Changes
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
    // Destructure commonly-used properties to make things nicer to manage
    const {
      name,
      validators: { required, minLength, maxLength }
    } = field;
    const value = values[name];

    // And now for the error validation rules! Errors you want to see most must go at the end
    if (maxLength) {
      if (value && value.toString().length > maxLength) {
        errors[name] = `Must not exceed ${maxLength} characters!`;
      }
    }

    if (minLength) {
      if (!value || value.toString().length < minLength) {
        errors[name] = `Must be at least ${minLength} characters long!`;
      }
    }

    if (required) {
      if (!value) {
        errors[name] = "Please provide a value";
      }
    }
  });

  return errors;
}

const mapStateToProps = state => {
  const initialValues = state.users.selected;
  return { initialValues, auth: state.auth };
};
const mapDispatchToProps = { load: fetchUser, updateUser, fetchCurrentUser };

const EditUserReduxForm = reduxForm({ form: "editUserForm", validate })(
  EditUser
);
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditUserReduxForm)
);
