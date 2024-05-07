import React, { useEffect, useRef, useState } from "react";

export const TimeTable = ({ label }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (seconds >= 59) {
      setSeconds(0);
      setMinutes((prev) => prev + 1);
      if (minutes >= 59) {
        setMinutes(0);
        setHours((prev) => prev + 1);
      }
    }
  }, [seconds, minutes, hours, setHours, setMinutes, setSeconds]);

  const handleClickStart = () => {
    timer.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    setIsClicked(true);
  };

  const handleClickStop = () => {
    clearInterval(timer.current);
    setIsClicked(false);
  };

  return (
    <div className="flex gap-4">
      <div className="flex">
        <div>{hours < 10 ? `0${hours}` : hours}</div>:
        <div>{minutes < 10 ? `0${minutes}` : minutes}</div>:
        <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
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
      <button onClick={handleClickStop} className="hover:text-slate-500">
        STOP
      </button>
    </div>
  );
};
