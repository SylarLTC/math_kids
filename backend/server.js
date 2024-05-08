import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import cors from "cors";

dotenv.config();

const app = express();
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// middleware that allows us to save data in our db
app.use(express.json());

// middleware allows us connect backend with frontend
app.use(cors());

app.get("/math_results", (req, res) => {
  const q = "SELECT * from studying.math_results";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/math_results", (req, res) => {
  const q =
    "INSERT INTO studying.math_results (`Addition`, `Subtraction`, `Multiplication`, `Division`, `total_math_result`) VALUES (?)";

  const values = [
    req.body.Addition,
    req.body.Subtraction,
    req.body.Multiplication,
    req.body.Division,
    req.body.total_math_result,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Results saved succesfully!");
  });
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
