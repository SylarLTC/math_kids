import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { routerMath } from "./src/routes/routeMath.js";
import { routerUsers } from "./src/routes/routeUsers.js";
import { routerAuth } from "./src/routes/routeAuth.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 8800;

const app = express();
app.use(cookieParser());

// middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);

  next();
});

// middleware that allows us to save data in our db
app.use(express.json());

// middleware allows us connect backend with frontend
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routers
// auth
app.use("/api/auth", routerAuth);

// users
app.use("/api/users", routerUsers);

// math results
app.use("/api/math", routerMath);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
