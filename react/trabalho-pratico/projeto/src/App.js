import React, { Component } from "react";
import "./App.css";
import InputFullSalary from "./Components/InputFullSalary/InputFullSalary";
import InputReadOnly from "./Components/InputReadOnly/InputReadOnly";
import ProgressBarSalary from "./Components/ProgressBarSalary/ProgressBarSalary";
import { calculateSalaryFrom } from "./SalaryCalculations/salary";

class App extends Component {
  state = {
    fullSalary: 0,
  };

  handleChangeInput = (event) => {
    this.setState({ fullSalary: event.target.value });
  };

  render() {
    const { fullSalary } = this.state;

    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
      inssPercent,
      irpfPercent,
      netSalaryPercent,
    } = calculateSalaryFrom(fullSalary);

    return (
      <div>
        <InputFullSalary change={this.handleChangeInput} />
        <InputReadOnly
          baseINSS={baseINSS}
          discountINSS={discountINSS}
          baseIRPF={baseIRPF}
          discountIRPF={discountIRPF}
          netSalary={netSalary}
        />
        <ProgressBarSalary
          inssPercent={inssPercent}
          irpfPercent={irpfPercent}
          netSalaryPercent={netSalaryPercent}
        />
      </div>
    );
  }
}

export default App;
