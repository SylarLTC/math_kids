import nodemailer from "nodemailer";

export const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.OUTLOOK_EMAIL,
      pass: process.env.OUTLOOK_EMAIL_PASSWORD,
    },
  });

  return transporter;
};
