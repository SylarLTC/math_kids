import React from "react";
import { dbRandomNumbersSum } from "../db/db";
import { SumItem } from "./SumItem";

export const Sum = ({ totalCorrects, setTotalCorrects }) => {
  return (
    <div className="flex relative">
      <div className="flex flex-wrap justify-around mt-10 gap-4">
        {dbRandomNumbersSum.map((item) => {
          return (
            <SumItem
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
