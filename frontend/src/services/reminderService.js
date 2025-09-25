import { api } from "./axiousInit";

const createReminder = (payload) => {
  return api.post("/reminders/create", payload);
};

export const reminderService = {
  createReminder,
};
