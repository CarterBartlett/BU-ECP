import React, { Component } from 'react';
import { Input } from 'react-materialize';

class Dropdown extends Component {
  renderDropdownFields() {
    return this.props.data.map(d => {
      const {value, name} = d;
      return <option value={value}>{name}</option>;
    })
  }
  render() {
    const {s,label,defaultValue}=this.props;
    return <Input s={s} type='select' label={label} defaultValue={defaultValue}/>;
  }
}

export default Dropdown;