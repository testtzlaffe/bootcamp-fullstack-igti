import React from "react";
import Installment from "./Installment/Installment";

export default function Installments({ installments }) {
  const installmentsList = installments.map((installment) => {
    const { month } = installment;
    return <Installment values={installment} key={month} />;
  });

  return <div style={styles.container}>{installmentsList}</div>;
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "30px",
  },
};
