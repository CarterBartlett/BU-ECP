import React, { Component } from "react";
import * as moment from "moment";
import _ from "lodash";
import { Input } from "react-materialize";

class EditUserFormField extends Component {
  renderDropdownFieldItems() {
    const { options } = this.props;
    return _.map(options, option => {
      const { name, value, disabled } = option;
      return (
        <option key={name} value={value} disabled={disabled}>
          {name}
        </option>
      );
    });
  }
  renderDropdownField() {
    const { input, label, name, size } = this.props;
    return (
      <Input {...input} id={name} s={size} type="select" label={label}>
        {this.renderDropdownFieldItems()}
      </Input>
    );
  }
  renderTextField() {
    const {
      input,
      name,
      label,
      placeholder,
      size,
      meta: { error, touched }
    } = this.props;

    const displayError = touched && error;

    return (
      <Input
        {...input}
        type="text"
        id={name}
        name={name}
        className={displayError ? "invalid" : ""}
        label={label}
        placeholder={placeholder}
        error={displayError ? error : ''}
        s={size}
      />
    );
  }
  renderDatePickerField() {
    const { name, input, label, size } = this.props;
    if (input.value) {
      input.value = moment(input.value).format("YYYY-MM-DD");
    }
    return (
      <div class="col input-field">
        <label class="active">{label}</label>
        <Input
          {...input}
          id={name}
          name={name}
          label={label}
          labelClassName={input.value ? "active" : ""}
          type="date"
          s={size}
        />
      </div>
    );
  }
  render() {
    const { type } = this.props;
    switch (type) {
      case "text":
        return this.renderTextField();
      case "date":
        return this.renderDatePickerField();
      case "dropdown":
        return this.renderDropdownField();
      default:
        return <div>{type} is not a valid type</div>;
    }
  }
}

export default EditUserFormField;
