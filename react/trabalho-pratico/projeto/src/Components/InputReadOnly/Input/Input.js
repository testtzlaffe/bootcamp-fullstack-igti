import React, { Component } from "react";

export default class Input extends Component {
  render() {
    const { value, type } = this.props;
    return (
      <div>
        <label>{type}</label>
        <input value={value} readOnly />
      </div>
    );
  }
}
