const { sendReminderEmail } = require("../mailer");
const { getDueReminders, markAsSent } = require("../models/reminder.model");

const processDueReminders = async () => {
  const now = new Date();
  const reminders = await getDueReminders(now);

  if (!reminders || reminders.length === 0) {
    console.log("✅ No due reminders to process at", now);
    return;
  }

  console.log(`🔔 Found ${reminders.length} due reminders to process`);

  for (const r of reminders) {
    try {
      await sendReminderEmail({
        to: r.user_email,
        subject: `Reminder: ${r.title}`,
        text: r.description || "",
      });
      await markAsSent(r.id);
      console.log(`Sent reminder to ${r.id}`);
    } catch (e) {
      console.error("Email failed", e);
    }
  }
};
module.exports = { processDueReminders };
