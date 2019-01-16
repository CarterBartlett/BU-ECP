import React, { Component } from "react";
import * as moment from "moment";
import _ from "lodash";
import { Input, Autocomplete, Row } from "react-materialize";
import FileInputField from "./FileInputField";

class FormField extends Component {
  renderFilePicker() {
    const {
      name,
      input,
      label,
      size,
      onChange,
      meta: { error, touched }
    } = this.props;
    const { allowedTypes } = this.props.validators;
    const displayError = error;

    return (
      // This one is quite complicated, so rather than making this file even larger, we're just going to outsource it
      <div>
        <FileInputField
          input={input}
          name={name}
          label={label}
          size={size}
          accept={allowedTypes}
          error={displayError ? error : ""}
          style={{ paddingTop: "20px" }}
          onChange={e => {
            input.onChange();
            return e.target.files[0];
          }}
        />
        <span className="red-text">{displayError ? error : ""}</span>
      </div>
    );
  }
  renderDropdownFieldItems() {
    const { options } = this.props;
    return _.map(options, option => {
      const { name, value, disabled } = option;
      return (
        <option key={name} value={value||''} disabled={disabled}>
          {name}
        </option>
      );
    });
  }
  renderDropdownField() {
    const { input, label, name, size, placeholder, default: def, meta: {error, touched} } = this.props;
    const displayError = touched && error;
    return (
      <div>
      <Input {...input}
        id={name}
        s={size}
        type="select"
        label={label}
        placeholder={placeholder}
        default={def}
        onChange={input.onChange}
      >
        {this.renderDropdownFieldItems()}
      </Input>
        <span className="red-text">{displayError && touched}</span>
      </div>
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
      <div>
        <Input
          {...input}
          type="text"
          id={name}
          name={name}
          className={displayError ? "invalid" : ""}
          label={label}
          placeholder={placeholder}
          s={size}
          style={{ marginBottom: "5px" }}
        />
        <span className="red-text">{displayError && error}</span>
      </div>
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
      case "file":
        return this.renderFilePicker();
      default:
        return <div>{type} is not a valid type</div>;
    }
  }
}

export default FormField;
