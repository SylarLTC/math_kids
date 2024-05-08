import { useState } from "react";
import axios from "axios";
import { FaCircleQuestion } from "react-icons/fa6";
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
    Sum: 15,
    Subtract: 15,
    Multiply: 15,
    Division: 15,
  });
  const [timeTable, setTimeTable] = useState({
    Addition: "",
    Subtraction: "",
    Multiplication: "",
    Division: "",
  });
  const [hidden, setHidden] = useState(true);

  const sumTimeTableSeconds =
    parseInt(timeTable.Addition.split(":")[2]) +
    parseInt(timeTable.Subtraction.split(":")[2]) +
    parseInt(timeTable.Multiplication.split(":")[2]) +
    parseInt(timeTable.Division.split(":")[2]);

  const sumTimeTableMinutes =
    parseInt(timeTable.Addition.split(":")[1]) +
    parseInt(timeTable.Subtraction.split(":")[1]) +
    parseInt(timeTable.Multiplication.split(":")[1]) +
    parseInt(timeTable.Division.split(":")[1]);

  const sumTimeTableHours =
    parseInt(timeTable.Addition.split(":")[0]) +
    parseInt(timeTable.Subtraction.split(":")[0]) +
    parseInt(timeTable.Multiplication.split(":")[0]) +
    parseInt(timeTable.Division.split(":")[0]);

  const sumMinutesAndSeconds =
    sumTimeTableMinutes + Math.floor(sumTimeTableSeconds / 60);

  const convertedSumTimeTableSeconds =
    sumTimeTableSeconds > 59
      ? sumTimeTableSeconds % 60
      : sumTimeTableSeconds < 10
      ? `0${sumTimeTableSeconds}`
      : sumTimeTableSeconds;

  const convertedSumTimeTableMinutes =
    sumMinutesAndSeconds > 59
      ? sumMinutesAndSeconds % 60
      : sumMinutesAndSeconds < 10
      ? `0${sumMinutesAndSeconds}`
      : sumMinutesAndSeconds;

  const convertedSumTimeTableHours =
    sumTimeTableHours + Math.floor(sumMinutesAndSeconds / 60);

  const totalTimeTable = `${
    convertedSumTimeTableHours < 10
      ? `0${convertedSumTimeTableHours}`
      : convertedSumTimeTableHours
  }:${convertedSumTimeTableMinutes}:${convertedSumTimeTableSeconds}`;

  console.log("sumTimeTableSeconds:", sumTimeTableSeconds);
  console.log("sumTimeTableMinutes:", sumTimeTableMinutes);
  console.log("sumTimeTableHours:", sumTimeTableHours);
  console.log("totalTimeTable:", totalTimeTable);

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

  const totalCorrectsNumber =
    totalCorrects.Sum +
    totalCorrects.Subtract +
    totalCorrects.Multiply +
    totalCorrects.Division;
  console.log(totalCorrectsNumber);

  const handleClick = async () => {
    try {
      const res = await axios.post("http://localhost:8800/math_results", {
        Addition: timeTable.Addition,
        Subtraction: timeTable.Subtraction,
        Multiplication: timeTable.Multiplication,
        Division: timeTable.Division,
        total_math_result: totalTimeTable,
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col p-3">
      <nav className="flex justify-center relative">
        <h1 className="mainHeader text-5xl">Rania's Math Exercises</h1>
        <button
          className={`absolute py-2 px-1 right-40 border-solid border-2 rounded-xl ${
            totalCorrectsNumber < 60
              ? "text-rose-500 border-rose-500"
              : "text-green-500 border-green-500"
          } ${totalCorrectsNumber < 60 ? "" : "hover:text-green-600"}`}
          disabled={totalCorrectsNumber < 60}
          onClick={handleClick}
        >
          Submit time results
        </button>
        <FaCircleQuestion
          className="absolute right-[8.5rem] top-3"
          onMouseOver={() =>
            totalCorrectsNumber < 60 ? setHidden(false) : null
          }
          onMouseLeave={() => setHidden(true)}
        />
        {hidden ? null : (
          <div className="absolute text-xs z-10 top-12 py-2 px-1 right-20 border-solid border-2 rounded-xl">
            Will be active when all tasks are completed
          </div>
        )}
      </nav>

      <Accordion
        items={items}
        timeTable={timeTable}
        setTimeTable={setTimeTable}
      />
    </div>
  );
}

export default App;
