const express = require("express");
const cors = require("cors");
require("dotenv").config();

const emailQueue = require("./queue");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// Schedule email
app.post("/api/schedule-email", async (req, res) => {
  const { to, subject, message, sendAt } = req.body;

  await emailQueue.add(
    "send-email",
    { to, subject, message },
    {
      delay: new Date(sendAt).getTime() - Date.now(),
    }
  );

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
