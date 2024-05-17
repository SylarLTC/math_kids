import { createContext, useState } from "react";

export const TimeTableContext = createContext();

export const TimeTableContextProvider = ({ children }) => {
  const [timeTable, setTimeTable] = useState({
    Addition: "00:00:00",
    Subtraction: "00:00:00",
    Multiplication: "00:00:00",
    Division: "00:00:00",
  });

  const sumTimeTableSeconds =
    parseInt(timeTable.Addition.split(":")[2]) +
    parseInt(timeTable.Subtraction.split(":")[2]) +
    parseInt(timeTable.Multiplication.split(":")[2]) +
    parseInt(timeTable.Division.split(":")[2]);

  const sumTimeTableMinutes =
    parseInt(timeTable.Addition.split(":")[1]) +
    parseInt(timeTable.Subtraction.split(":")[1]) +
    parseInt(timeTable.Multiplication.split(":")[1]) +
    parseInt(timeTable.Division.split(":")[1]);

  const sumTimeTableHours =
    parseInt(timeTable.Addition.split(":")[0]) +
    parseInt(timeTable.Subtraction.split(":")[0]) +
    parseInt(timeTable.Multiplication.split(":")[0]) +
    parseInt(timeTable.Division.split(":")[0]);

  const sumMinutesAndSeconds =
    sumTimeTableMinutes + Math.floor(sumTimeTableSeconds / 60);

  const convertedSumTimeTableSeconds =
    sumTimeTableSeconds > 59
      ? sumTimeTableSeconds % 60
      : sumTimeTableSeconds < 10
      ? `0${sumTimeTableSeconds}`
      : sumTimeTableSeconds;

  const convertedSumTimeTableMinutes =
    sumMinutesAndSeconds > 59
      ? sumMinutesAndSeconds % 60
      : sumMinutesAndSeconds < 10
      ? `0${sumMinutesAndSeconds}`
      : sumMinutesAndSeconds;

  const convertedSumTimeTableHours =
    sumTimeTableHours + Math.floor(sumMinutesAndSeconds / 60);

  const totalTimeTable = `${
    convertedSumTimeTableHours < 10
      ? `0${convertedSumTimeTableHours}`
      : convertedSumTimeTableHours
  }:${convertedSumTimeTableMinutes}:${convertedSumTimeTableSeconds}`;

  const value = { totalTimeTable, timeTable, setTimeTable };

  return (
    <TimeTableContext.Provider value={value}>
      {children}
    </TimeTableContext.Provider>
  );
};
