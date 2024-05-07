import React from "react";
import { dbRandomNumbersSubtract } from "../db/db";
import { SubtractItem } from "./SubtractItem";
// import { TimeTable } from "./TimeTable";

export const Subtract = ({ totalCorrects, setTotalCorrects }) => {
  return (
    <div className="flex relative">
      {/* <div className="absolute right-0 top-0 z-10">
        <TimeTable />
      </div> */}
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
