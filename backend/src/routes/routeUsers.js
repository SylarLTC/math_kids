import express from "express";
import { getUser } from "../controllers/controllerUsers.js";

export const routerUsers = express.Router();

routerUsers.get("/find/:userId", getUser);
