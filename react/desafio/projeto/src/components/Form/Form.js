import React from "react";

export default function Form({ values, handlers }) {
  const { initialValue, interestRate, months } = values;
  const {
    handleChangeInitialValue,
    handleChangeInterestRate,
    handleChangeMonths,
  } = handlers;

  return (
    <div>
      <form>
        <div>
          <p>
            <label style={styles.label} htmlFor="initialValue">
              Montante inicial:
            </label>
          </p>
          <input
            style={styles.input}
            id="initialValue"
            type="number"
            value={initialValue}
            onChange={handleChangeInitialValue}
          />
        </div>
        <div>
          <p>
            <label style={styles.label} htmlFor="interestRate">
              Taxa de juros mensal:
            </label>
          </p>
          <input
            style={styles.input}
            id="interestRate"
            type="number"
            value={interestRate}
            onChange={handleChangeInterestRate}
          />
        </div>
        <div>
          <p>
            <label style={styles.label} htmlFor="months">
              Período (meses):
            </label>
          </p>
          <input
            style={styles.input}
            id="months"
            type="number"
            value={months}
            onChange={handleChangeMonths}
          />
        </div>
      </form>
    </div>
  );
}

const styles = {
  label: {
    fontSize: "0.8rem",
  },

  input: {
    height: "20px",
    width: "50%",
    maxWidth: "300px",
  },
};
