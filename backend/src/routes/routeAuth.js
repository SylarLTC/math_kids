import express from "express";
import { login, register, logout } from "../controllers/controllerAuth.js";

export const routerAuth = express.Router();

routerAuth.post("/register", register);
routerAuth.post("/login", login);
routerAuth.post("/logout", logout);
