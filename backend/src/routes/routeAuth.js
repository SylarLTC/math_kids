import express from "express";
import {
  login,
  register,
  logout,
  verifyEmail,
} from "../controllers/controllerAuth.js";

export const routerAuth = express.Router();

routerAuth.post("/register", register);
routerAuth.post("/login", login);
routerAuth.post("/logout", logout);
routerAuth.post("/verify-email", verifyEmail);
