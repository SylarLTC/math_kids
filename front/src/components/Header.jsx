import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCircleQuestion } from "react-icons/fa6";

import { axiosRequest } from "../utils/axiosConfig";
import { useToast } from "../hooks/useToast";
import { useAuthContext } from "../hooks/useAuthContext";

export const Header = ({ totalCorrects, timeTable }) => {
  const [hidden, setHidden] = useState(true);
  const toast = useToast();
  const { currentUser, logout } = useAuthContext();

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

  const totalCorrectsNumber =
    totalCorrects.Sum +
    totalCorrects.Subtract +
    totalCorrects.Multiply +
    totalCorrects.Division;

  const handleClickSubmitResults = async () => {
    try {
      await axiosRequest.post("/math/math_results", {
        Addition: timeTable.Addition,
        Subtraction: timeTable.Subtraction,
        Multiplication: timeTable.Multiplication,
        Division: timeTable.Division,
        total_math_result: totalTimeTable,
      });

      toast.success("Results successfully saved!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="flex flex-wrap justify-around items-center gap-3">
        {!currentUser ? null : (
          <div className="flex flex-wrap gap-4 items-center">
            <Link to={"/"}>Home</Link>
            <Link to={"/history"}>History</Link>
            <div>{currentUser.username}</div>
            <div className=" cursor-pointer" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}

        <h1 className="mainHeader text-5xl">
          {!currentUser
            ? null
            : `${currentUser.username.replace(
                currentUser.username[0],
                currentUser.username[0].toUpperCase()
              )}'s `}
          Math Exercises
        </h1>
        <div className="flex items-center gap-2 relative">
          <button
            className={` ${
              totalCorrectsNumber < 60
                ? "text-slate-500 border-slate-500"
                : "text-green-500 border-green-500"
            } ${totalCorrectsNumber < 60 ? "" : "hover:text-green-600"}`}
            disabled={totalCorrectsNumber < 60}
            onClick={handleClickSubmitResults}
          >
            Submit time results
          </button>
          <FaCircleQuestion
            className=""
            onMouseEnter={() =>
              totalCorrectsNumber < 60 ? setHidden(false) : null
            }
            onMouseLeave={() => setHidden(true)}
          />
          {hidden ? null : (
            <div className="absolute w-52 text-xs z-10 top-6 py-2 px-1 right-0 border-solid border-2 rounded-xl">
              Will be active when all tasks are completed
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
