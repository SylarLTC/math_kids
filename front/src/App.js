import { useState } from "react";
import axios from "axios";
import "./App.css";
import { Accordion } from "./components/Accordion";
import { Division } from "./components/Division";
import { Multiply } from "./components/Multiply";
import { Subtract } from "./components/Subtract";
import { Sum } from "./components/Sum";
import {
  totalAmountOfSumElements,
  totalAmountOfSubtractElements,
  totalAmountOfMultiplyElements,
  totalAmountOfDivisionElements,
} from "./db/db";

function App() {
  const [totalCorrects, setTotalCorrects] = useState({
    Sum: 0,
    Subtract: 0,
    Multiply: 0,
    Division: 0,
  });

  const items = [
    {
      id: "asdj2342",
      label: "Addition",
      content: (
        <Sum
          totalCorrects={totalCorrects}
          setTotalCorrects={setTotalCorrects}
        />
      ),
      corrects: totalCorrects.Sum,
      totalAmountOfElements: totalAmountOfSumElements,
    },
    {
      id: "asdjasdsd234",
      label: "Subtraction",
      content: (
        <Subtract
          totalCorrects={totalCorrects}
          setTotalCorrects={setTotalCorrects}
        />
      ),
      corrects: totalCorrects.Subtract,
      totalAmountOfElements: totalAmountOfSubtractElements,
    },
    {
      id: "zxcasd34123d",
      label: "Multiplication",
      content: (
        <Multiply
          totalCorrects={totalCorrects}
          setTotalCorrects={setTotalCorrects}
        />
      ),
      corrects: totalCorrects.Multiply,
      totalAmountOfElements: totalAmountOfMultiplyElements,
    },
    {
      id: "zxcasd739846s",
      label: "Division",
      content: (
        <Division
          totalCorrects={totalCorrects}
          setTotalCorrects={setTotalCorrects}
        />
      ),
      corrects: totalCorrects.Division,
      totalAmountOfElements: totalAmountOfDivisionElements,
    },
  ];

  const handleClick = async () => {
    try {
      const res = await axios.post("http://localhost:8800/math_results", {
        Addition: "00:02:00",
        Subtraction: "00:03:00",
        Multiplication: "00:04:00",
        Division: "00:05:00",
        total_math_result: "00:14:00",
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col p-3">
      <nav className="flex justify-center">
        <h1 className="mainHeader text-5xl">Rania's Math Exercises</h1>
      </nav>

      <Accordion items={items} totalCorrects={totalCorrects} />

      <button onClick={handleClick}>Submit time results</button>
    </div>
  );
}

export default App;
