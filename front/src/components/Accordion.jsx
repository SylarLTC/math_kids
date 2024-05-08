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
          <div className="m-5 relative" key={item.id}>
            <div
              className="flex p-3 bg-gray-50 border-b items-center cursor-pointer"
              onClick={() => handleClick(index)}
            >
              <span className={`text-xl w-[3%]`}>
                {isExpanded ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
              </span>
              <div className="w-[20%]">{item.label}</div>
              <div className="ml-[20%]">{`Solved: ${item.corrects} out of ${item.totalAmountOfElements}`}</div>
            </div>
            <div className="absolute top-0 right-48 py-3">
              <TimeTable
                label={item.label}
                timeTable={timeTable}
                setTimeTable={setTimeTable}
              />
            </div>
            {isExpanded && <div className="border-b p-5">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
};
