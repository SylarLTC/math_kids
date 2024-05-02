import React, { useEffect } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const MultiplyItem = ({ item, totalCorrects, setTotalCorrects }) => {
  const [answer, setAnswer] = useSessionStorage(
    `multiply answer ${item.id}`,
    ""
  );
  const [checkAnswer, setCheckAnswer] = useSessionStorage(
    `multiply checkAnswer ${item.id}`,
    0
  );

  const equalBool = checkAnswer.toString() === answer;

  useEffect(() => {
    if (equalBool) {
      setTotalCorrects({
        ...totalCorrects,
        Multiply: totalCorrects.Multiply + 1,
      });
    } else {
      setTotalCorrects({ ...totalCorrects });
    }
  }, [equalBool]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setCheckAnswer((prev) => (prev = item.first * item.second));
  };

  const checkColorClass = !checkAnswer
    ? ""
    : checkAnswer.toString() === answer
    ? "bg-green-400"
    : "bg-rose-500";

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
      {!checkAnswer ? (
        ""
      ) : (
        <div className="m-5 font-semibold text-white">
          {checkAnswer.toString() === answer ? "Correct" : "Incorrect"}
        </div>
      )}
    </div>
  );
};