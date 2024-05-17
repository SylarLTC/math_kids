import { useContext } from "react";
import { TotalCorrectsContext } from "../contexts/TotalCorects";

export const useTotalCorrectsContext = () => useContext(TotalCorrectsContext);
