import React from "react";
import { dbRandomNumbersMultiply } from "../db/db";
import { MultiplyItem } from "./MultiplyItem";

export const Multiply = ({ totalCorrects, setTotalCorrects }) => {
  return (
    <div className="flex relative">
      <div className="flex flex-wrap justify-around mt-10 gap-4">
        {dbRandomNumbersMultiply.map((item) => {
          return (
            <MultiplyItem
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
