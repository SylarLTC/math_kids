import { createMailTransporter } from "./createMailTransporter.js";

export const sendVerificationMail = (user) => {
  const transporter = createMailTransporter();

  const mailOptions = {
    from: `"ME Studying" <me.studying@outlook.com>`,
    to: user.email,
    subject: "Verify your email...",
    html: `<p>Hello ${user.username}, verify your email by clicking this link...</p>
        <a href='${process.env.CLIENT_URL}/verify-email?emailToken=${user.emailToken}'>Verify your email</a>
        `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    console.log("Verification email sent");
  });
};
