const cron = require("node-cron");
const { processDueReminders } = require("./processReminders");

function startCron() {
  // runs every minute
  cron.schedule("* * * * *", async () => {
    console.info("Running reminder cron at", new Date());
    processDueReminders();
  });
}

module.exports = { startCron };
