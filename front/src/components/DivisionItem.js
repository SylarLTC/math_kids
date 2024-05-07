import React, { useEffect, useState } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { totalAmountOfDivisionElements } from "../db/db";

export const DivisionItem = ({ item, totalCorrects, setTotalCorrects }) => {
  const [answer, setAnswer] = useSessionStorage(
    `division answer ${item.id}`,
    ""
  );
  const [checkAnswer, setCheckAnswer] = useSessionStorage(
    `division checkAnswer ${item.id}`,
    0
  );
  const [equalityNumbers, setEqualityNumbers] = useState(false);
  const [checkColorClass, setCheckColorClass] = useState("");

  useEffect(() => {
    if (item.first % item.second === 0) {
      setCheckAnswer(item.first / item.second);
    } else {
      setCheckAnswer(
        (item.first + (item.second - (item.first % item.second))) / item.second
      );
    }

    if (
      equalityNumbers === true &&
      totalCorrects.Division < totalAmountOfDivisionElements
    ) {
      setTotalCorrects({
        ...totalCorrects,
        Division: totalCorrects.Division + 1,
      });
    }
  }, [item.first, item.second, setCheckAnswer, equalityNumbers]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (answer !== checkAnswer.toString()) {
      setEqualityNumbers(false);
      setCheckColorClass("bg-rose-500");
    } else {
      setEqualityNumbers(true);
      setCheckColorClass("bg-green-400");
    }
  };

  return (
    <div className={`border mb-2 w-[40%] ${checkColorClass}`}>
      <form className="flex flex-col gap-1 mx-10 my-5" onSubmit={handleSubmit}>
        <div className="font-semibold">Exercise {item.id}:</div>
        <div className="flex flex-row">
          <div className="mr-2 p-2">
            {item.first % item.second === 0
              ? `${item.first} / ${item.second}`
              : `${item.first + (item.second - (item.first % item.second))} / ${
                  item.second
                }`}
          </div>
          <input
            type="number"
            className="border mr-2 p-2"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button className="border p-2 rounded">Check the answer</button>
        </div>
      </form>
      {!checkColorClass ? (
        ""
      ) : (
        <div className="m-5 font-semibold text-white">
          {equalityNumbers ? "Correct" : "Incorrect"}
        </div>
      )}
    </div>
  );
};
