import React from "react";
import { dbRandomNumbersDivision } from "../db/db";
import { DivisionItem } from "./DivisionItem";

export const Division = ({ totalCorrects, setTotalCorrects }) => {
  return (
    <div className="flex relative">
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
