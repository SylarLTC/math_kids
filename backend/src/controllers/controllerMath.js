import { db } from "../../dbConnection.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getMathResults = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.SECRET_KEY_TOKEN, (err, data) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      // "SELECT m.*, u.users_id AS users_id, username FROM math_results AS m JOIN users AS u ON (u.users_id = m.users_id)";
      `SELECT * FROM math_results WHERE users_id = ${data.id}`;

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

// export const addMathResults = (req, res) => {
//   const q =
//     "INSERT INTO studying.math_results (`Addition`, `Subtraction`, `Multiplication`, `Division`, `total_math_result`) VALUES (?)";
//   const values = [
//     req.body.Addition,
//     req.body.Subtraction,
//     req.body.Multiplication,
//     req.body.Division,
//     req.body.total_math_result,
//   ];
//   db.query(q, [values], (err, data) => {
//     if (err) return res.json(err);
//     return res.json("Results saved succesfully!");
//   });
// };

export const addMathResults = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.SECRET_KEY_TOKEN, (err, data) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "INSERT INTO studying.math_results (`Addition`, `Subtraction`, `Multiplication`, `Division`, `total_math_result`, `users_id`) VALUES (?)";
    const values = [
      req.body.Addition,
      req.body.Subtraction,
      req.body.Multiplication,
      req.body.Division,
      req.body.total_math_result,
      data.id,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json("Results saved succesfully!");
    });
  });
};
