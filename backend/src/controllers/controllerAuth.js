import { db } from "../../dbConnection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import { sendVerificationMail } from "../utils/sendVerificationMail.js";

dotenv.config();

export const register = (req, res) => {
  // Check if user exists in database
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // Create a new user
    const q =
      "INSERT INTO users (`username`,`password`,`email`, `emailToken`) VALUES (?)";

    const values = [
      req.body.username,
      hashedPassword,
      req.body.email,
      crypto.randomBytes(64).toString("hex"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      const user = {
        username: values[0],
        email: values[2],
        emailToken: values[3],
      };

      sendVerificationMail(user);
      return res.status(200).json("User has been created!");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found.");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong username or password.");

    const token = jwt.sign(
      { id: data[0].users_id },
      process.env.SECRET_KEY_TOKEN
    );

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        path: "/",
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: -1,
      path: "/",
    })
    .status(200)
    .json("User has been logged out.");
};

export const verifyEmail = async (req, res) => {
  try {
    const emailToken = req.body.emailToken;

    if (!emailToken) return res.status(404).json("Email Token not found.");

    const q = "SELECT * FROM users WHERE emailToken = (?)";

    db.query(q, [req.body.emailToken], (err, data) => {
      if (err) return res.status(400).json("Invalid token.");
      if (data.length === 0)
        return res
          .status(404)
          .json("Email verification failed, invalid token!");

      const q =
        "UPDATE users SET isVerified = 1, emailToken = null WHERE email = (?)";

      const values = [data[0].email];

      const token = jwt.sign(
        { id: data[0].users_id },
        process.env.SECRET_KEY_TOKEN
      );

      db.query(q, [values], (err, info) => {
        if (err) return res.status(500).json(err);

        res
          .cookie("accessToken", token, {
            httpOnly: true,
            path: "/",
          })
          .status(200)
          .json(data[0]);
      });
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
