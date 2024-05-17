import { useContext } from "react";
import { TimeTableContext } from "../contexts/TimeTableContext";

export const useTimeTable = () => useContext(TimeTableContext);
