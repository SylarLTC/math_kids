import express from "express";
import {
  getMathResults,
  addMathResults,
} from "../controllers/controllerMath.js";
import { db } from "../../dbConnection.js";

export const routerMath = express.Router();

routerMath.get("/math_results", getMathResults);

routerMath.post("/math_results", addMathResults);
