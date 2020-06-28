import React, { Component } from "react";
import Input from "./Input/Input";

export default class InputReadOnly extends Component {
  render() {
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = this.props;

    return (
      <div>
        <Input type="baseINSS" value={baseINSS} />
        <Input type="discountINSS" value={discountINSS} />
        <Input type="baseIRPF" value={baseIRPF} />
        <Input type="discountIRPF" value={discountIRPF} />
        <Input type="netSalary" value={netSalary} />
      </div>
    );
  }
}
