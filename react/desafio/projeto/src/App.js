import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import Installments from "./components/Installments/Installments";

function App() {
  const [initialValue, setInitialValue] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [months, setMonths] = useState(1);
  const [installments, setInstallments] = useState([]);

  useEffect(() => {
    let localInstallments = [];

    for (let i = 1; i <= months; i++) {
      const percent = (Math.pow(1 + interestRate / 100, i) - 1) * 100;
      const increment = (
        initialValue * (1 + percent / 100) -
        initialValue
      ).toFixed(2);
      const value = (parseFloat(initialValue) + parseFloat(increment)).toFixed(
        2
      );

      localInstallments.push({
        month: i,
        value,
        increment,
        percent,
      });
    }

    setInstallments(localInstallments);
  }, [initialValue, interestRate, months]);

  const handleChangeInitialValue = (event) => {
    setInitialValue(event.target.value);
  };

  const handleChangeInterestRate = (event) => {
    setInterestRate(event.target.value);
  };

  const handleChangeMonths = (event) => {
    setMonths(event.target.value);
  };

  return (
    <div className="App">
      <Form
        values={{ initialValue, interestRate, months }}
        handlers={{
          handleChangeInitialValue,
          handleChangeInterestRate,
          handleChangeMonths,
        }}
      />

      <Installments installments={installments} />
    </div>
  );
}

export default App;
