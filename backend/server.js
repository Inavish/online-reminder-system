require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const reminderRoutes = require("./src/routes/reminderRoutes");
const { startCron } = require("./src/workers/cron");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/reminders", reminderRoutes);
app.get("/", (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.info("Server listening on", port);
  startCron();
});
