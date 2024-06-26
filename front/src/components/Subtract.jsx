import React from "react";
import { dbRandomNumbersSubtract } from "../db/db";
import { SubtractItem } from "./SubtractItem";

export const Subtract = ({ totalCorrects, setTotalCorrects }) => {
  return (
    <div className="flex relative">
      <div className="flex flex-wrap justify-around mt-10 gap-4">
        {dbRandomNumbersSubtract.map((item) => {
          return (
            <SubtractItem
              key={item.id}
              item={item}
              totalCorrects={totalCorrects}
              setTotalCorrects={setTotalCorrects}
            />
          );
        })}
      </div>
    </div>
  );
};
