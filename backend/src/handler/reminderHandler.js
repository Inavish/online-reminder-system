const { createReminderInDb } = require("../models/reminder.model");

const createReminder = async (req, res) => {
  const { title, description, send_at } = req.body;
  if (!title || !send_at)
    return res.status(400).json({ error: "title and send_at required" });
  const reminder = createReminderInDb({
    user_id: req.user.id,
    title,
    description,
    send_at,
  });

  res.json(reminder);
};

module.exports = { createReminder };
