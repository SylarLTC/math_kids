import { useState } from "react";
import "./App.css";
import { Accordion } from "./components/Accordion";
import { Division } from "./components/Division";
import { Multiply } from "./components/Multiply";
import { Subtract } from "./components/Subtract";
import { Sum } from "./components/Sum";

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
    },
  ];
  return (
    <div className="flex flex-col p-3">
      <nav className="flex justify-center">
        <h1 className="mainHeader text-5xl">Rania's Math Exercises</h1>
      </nav>

      <Accordion items={items} totalCorrects={totalCorrects} />
    </div>
  );
}

export default App;
