import React, { Component } from "react";

export default class ProgressBarSalary extends Component {
  render() {
    const { inssPercent, irpfPercent, netSalaryPercent } = this.props;

    const styles = {
      bar: {
        display: "flex",
      },

      primeiro: {
        backgroundColor: "red",
        width: `${inssPercent}%`,
      },

      segundo: {
        backgroundColor: "orange",
        width: `${irpfPercent}%`,
      },
      terceiro: {
        backgroundColor: "green",
        width: `${netSalaryPercent}%`,
      },
    };

    return (
      <div style={styles.bar}>
        <div style={styles.primeiro}>INSS</div>
        <div style={styles.segundo}>IRPF</div>
        <div style={styles.terceiro}>NetSalary</div>
      </div>
    );
  }
}
