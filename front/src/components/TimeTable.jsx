import React, { useEffect, useRef, useState } from "react";
import { useTimeTable } from "../hooks/useTimeTable";

export const TimeTable = ({ label }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const timer = useRef(null);
  const { timeTable, setTimeTable } = useTimeTable();

  const convertedHours = hours < 10 ? `0${hours}` : hours;
  const convertedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const convertedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  useEffect(() => {
    if (seconds >= 60) {
      setSeconds(0);
      setMinutes((prev) => prev + 1);
      if (minutes >= 59) {
        setMinutes(0);
        setHours((prev) => prev + 1);
      }
    }
  }, [seconds, minutes, hours, setHours, setMinutes, setSeconds]);

  const handleClickStart = (e) => {
    e.stopPropagation();
    timer.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    setIsClicked(true);
  };

  const handleClickStopAndTimeSubmit = (e) => {
    e.stopPropagation();
    clearInterval(timer.current);
    setIsClicked(false);
    setTimeTable({
      ...timeTable,
      [label]: `${convertedHours}:${convertedMinutes}:${convertedSeconds}`,
    });
  };

  return (
    <div className="flex flex-wrap gap-4 h-full">
      <div className="flex">
        <div>{convertedHours}</div>:<div>{convertedMinutes}</div>:
        <div>{convertedSeconds}</div>
      </div>
      <button
        disabled={isClicked}
        onClick={handleClickStart}
        className={
          isClicked ? "text-slate-300 h-full" : "hover:text-slate-500 h-full"
        }
      >
        START
      </button>
      <button
        onClick={handleClickStopAndTimeSubmit}
        className="hover:text-slate-500"
      >
        STOP
      </button>
    </div>
  );
};
