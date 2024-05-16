import { Accordion } from "../components/Accordion";
import { Division } from "../components/Division";
import { Multiply } from "../components/Multiply";
import { Subtract } from "../components/Subtract";
import { Sum } from "../components/Sum";
import {
  totalAmountOfSumElements,
  totalAmountOfSubtractElements,
  totalAmountOfMultiplyElements,
  totalAmountOfDivisionElements,
} from "../db/db";
import { Header } from "../components/Header";

export const Home = ({
  totalCorrects,
  setTotalCorrects,
  timeTable,
  setTimeTable,
}) => {
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

  return (
    <div className="flex flex-col p-3">
      <Header totalCorrects={totalCorrects} timeTable={timeTable} />

      <Accordion
        items={items}
        timeTable={timeTable}
        setTimeTable={setTimeTable}
      />
    </div>
  );
};
