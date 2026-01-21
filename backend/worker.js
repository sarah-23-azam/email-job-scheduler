const { Worker } = require("bullmq");
const nodemailer = require("nodemailer");
const redis = require("./redis");
require("dotenv").config();

console.log("👷 Email worker is running...");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

new Worker(
  "email-queue",
  async (job) => {
    const { to, subject, message } = job.data;

    // 🔹 ADD THIS
    console.log("📨 Processing job:", job.id);
    console.log("➡️ Sending email to:", to);

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text: message,
    });

    // 🔹 ADD THIS
    console.log("✅ Email sent successfully to:", to);
  },
  { connection: redis }
);
