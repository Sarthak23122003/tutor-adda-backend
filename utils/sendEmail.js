const nodemailer = require("nodemailer");

const sendEmail = async (options) => {

  // CREATE TRANSPORTER
  const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

      user: process.env.EMAIL_USER,

      pass: process.env.EMAIL_PASS,

    },

  });

  // EMAIL OPTIONS
  const mailOptions = {

    from: process.env.EMAIL_USER,

    to: options.email,

    subject: options.subject,

    text: options.message,

  };

  // SEND EMAIL
  await transporter.sendMail(mailOptions);

};

module.exports = sendEmail;