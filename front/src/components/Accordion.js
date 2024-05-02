import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropleft } from "react-icons/io";

export const Accordion = ({ items }) => {
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
              className="flex justify-between p-3 bg-gray-50 border-b items-center cursor-pointer"
              onClick={() => handleClick(index)}
            >
              <div>{item.label}</div>
              <div className="">{`Solved: ${item.corrects} out of ${item.totalAmountOfElements}`}</div>
              <span className={`text-xl`}>
                {isExpanded ? <IoMdArrowDropdown /> : <IoMdArrowDropleft />}
              </span>
            </div>
            {isExpanded && <div className="border-b p-5">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
};
