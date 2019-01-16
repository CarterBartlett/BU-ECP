import React, { Component } from "react";
import { Input } from "react-materialize";

export default class FieldFileInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const {
      input: { onChange }
    } = this.props;
    onChange(e.target.files[0]);
  }

  render() {
    const {
      input: { value }
    } = this.props;
    const { name, label, accept, size, style, error } = this.props; //whatever props you send to the component from redux-form Field
    return (
        <Input
        name={name}
        label={label}
        type="file"
        accept={accept.join(', ')}
        onChange={this.onChange}
        s={size}
        style={style}
        error={error} />
    );
  }
}
