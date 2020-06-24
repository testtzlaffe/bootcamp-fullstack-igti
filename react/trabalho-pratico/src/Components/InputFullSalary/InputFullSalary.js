import React, { Component } from "react";

export default class InputFullSalary extends Component {
  render() {
    const { change } = this.props;
    return (
      <div>
        <input
          onChange={change}
          type="number"
          placeholder="Digite o salário"
          min="0"
        />
      </div>
    );
  }
}
