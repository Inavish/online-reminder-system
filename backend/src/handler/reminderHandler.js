const {
  createReminderInDb,
  getUpComingReminderFromDb,
  getPastRemindersFromDb,
  getReminderById,
  deleteReminderById,
} = require("../models/reminder.model");

const createReminder = async (req, res) => {
  const { title, description, send_at } = req.body;
  if (!title || !send_at)
    return res.status(400).json({ error: "title and send_at required" });
  if (new Date(send_at) < new Date()) {
    return res.status(400).json({ error: "send_at must be in the future" });
  }
  const reminder = createReminderInDb({
    user_id: req.user.id,
    title,
    description,
    send_at,
  });

  res.json(reminder);
};

const getUpComingReminder = async (req, res) => {
  const reminders = await getUpComingReminderFromDb(req.user);

  res.json(reminders);
};

const getPastReminders = async (req, res) => {
  const reminders = await getPastRemindersFromDb(req.user);
  res.json(reminders);
};

const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;

    const reminder = await getReminderById(id);
    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    await deleteReminderById(id);

    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createReminder,
  getUpComingReminder,
  getPastReminders,
  deleteReminder,
};
