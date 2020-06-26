import React from "react";

export default function Installment({ values }) {
  const { month, value, increment, percent } = values;
  return (
    <div style={styles.card}>
      <div style={styles.month}>{month}</div>
      <div style={styles.element}>M: {value}</div>
      <div style={styles.element}>
        {increment > 0 ? "+" : null}
        {increment}
      </div>
      <div style={styles.element}>{percent.toFixed(2)}%</div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    margin: "2px",
    borderRadius: "4px",
    padding: "4px",
    minWidth: "100px",
  },

  month: {
    fontSize: "0.7rem",
    backgroundColor: "#ccc",
    borderRadius: "4px",
    color: "white",
    padding: "2px",
  },

  element: {
    marginTop: "5px",
  },
};
