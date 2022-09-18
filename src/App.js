/* eslint-disable no-eval */
import { useEffect,useState } from "react";

function App() {
  const [cal, setCal] = useState("");
  const [res, setRes] = useState("");

  const ops = ["/", "*", "+", "-", "."];
  const TITLE = "Calculator";

  useEffect(() => { document.title = TITLE; });

  const updateCal = (value) => {
    if ((ops.includes(value) && cal === "") || (ops.includes(value) && ops.includes(cal.slice(-1)))) {
      return;
    }

    setCal(cal + value);

    if (!ops.includes(value)) {
      setRes(eval(cal+value).toString());
    }
  };

  const calculate = () => {
    setCal(eval(cal).toString());
  };

  const deleteCal = () => {
    if ( cal === "") {
      return;
    }

    const value = cal.slice(0, -1);

    setCal(value);
    setRes(value);
  };

  const createDig = () => {
    const digits = [];
    for (let i = 1; i< 10; i++) {
      digits.push(
          <button onClick={ () => updateCal(i.toString()) } key={i}>{i}</button>,
      );
    }
    return digits;
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          { res ? <span>({res})</span> : ""}&nbsp;
          { cal || "0" }
        </div>
        <div className="operators">
          <button onClick={ () => updateCal("/") }>/</button>
          <button onClick={ () => updateCal("*") }>*</button>
          <button onClick={ () => updateCal("+") }>+</button>
          <button onClick={ () => updateCal("-") }>-</button>

          <button onClick={deleteCal}>DEL</button>
        </div>
        <div className="digits">
          { createDig() }
          <button onClick={ () => updateCal("0") }>0</button>
          <button onClick={ () => updateCal(".") }>.</button>

          <button className="equal" onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
