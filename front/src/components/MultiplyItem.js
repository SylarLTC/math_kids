import React, { useEffect, useState } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { totalAmountOfMultiplyElements } from "../db/db";

export const MultiplyItem = ({ item, totalCorrects, setTotalCorrects }) => {
  const [answer, setAnswer] = useSessionStorage(
    `multiply answer ${item.id}`,
    ""
  );
  const [checkAnswer, setCheckAnswer] = useSessionStorage(
    `multiply checkAnswer ${item.id}`,
    0
  );
  const [equalityNumbers, setEqualityNumbers] = useState(false);
  const [checkColorClass, setCheckColorClass] = useState("");

  useEffect(() => {
    setCheckAnswer(item.first * item.second);

    if (
      equalityNumbers === true &&
      totalCorrects.Multiply < totalAmountOfMultiplyElements
    ) {
      setTotalCorrects({
        ...totalCorrects,
        Multiply: totalCorrects.Multiply + 1,
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
            {item.first} * {item.second} =
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
