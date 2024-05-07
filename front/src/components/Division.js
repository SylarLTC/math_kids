import React from "react";
import { dbRandomNumbersDivision } from "../db/db";
import { DivisionItem } from "./DivisionItem";
// import { TimeTable } from "./TimeTable";

export const Division = ({ totalCorrects, setTotalCorrects }) => {
  return (
    <div className="flex relative">
      {/* <div className="absolute right-0 top-0 z-10">
        <TimeTable />
      </div> */}
      <div className="flex flex-wrap justify-around mt-10 gap-4">
        {dbRandomNumbersDivision.map((item) => {
          return (
            <DivisionItem
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
