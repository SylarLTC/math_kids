import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { TimeTable } from "./TimeTable";

export const Accordion = ({ items, timeTable, setTimeTable }) => {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleClick = (nextIndex) => {
    setExpandedIndex((currentExpandedIndex) => {
      if (currentExpandedIndex === nextIndex) {
        return -1;
      } else {
        return nextIndex;
      }
    });
  };

  return (
    <div className="border rounded mt-3">
      {items.map((item, index) => {
        const isExpanded = index === expandedIndex;

        return (
          <div className="m-5" key={item.id}>
            <div
              className="flex flex-wrap justify-around p-3 bg-gray-50 border-b items-center cursor-pointer"
              onClick={() => handleClick(index)}
            >
              <div className="flex flex-wrap justify-start w-1/3">
                <span className={`text-xl`}>
                  {isExpanded ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
                </span>
                <div className="">{item.label}</div>
              </div>

              <div className="flex flex-wrap w-1/4">{`Solved: ${item.corrects} out of ${item.totalAmountOfElements}`}</div>
              <div className="flex flex-wrap w-1/4">
                <TimeTable
                  label={item.label}
                  timeTable={timeTable}
                  setTimeTable={setTimeTable}
                />
              </div>
            </div>

            {isExpanded && <div className="border-b p-5">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
};
