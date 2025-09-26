# Frontend (React + MUI)

This app provides the UI for the Online Reminder System.

## Key Components

- `components/ReminderForm.jsx`: create reminder form with client-side validation preventing past datetimes. Calls backend via `reminderService.createReminder`. Optionally invokes `onCreated` to notify parent.
- `components/UpcomingReminder.jsx`: lists upcoming reminders. Refetches when a `refreshKey` prop changes and supports deleting reminders.
- `components/PastReminders.jsx`: lists past reminders with delete action.
- `components/Dashboard.jsx`: orchestrates layout, keeps `upcomingRefreshKey`, passes `onCreated` to the form, and displays both lists.

## Services

- `services/axiousInit.js`: configured Axios instance
- `services/reminderService.js`: API calls for reminders

## Running

- `npm install`
- Dev: `npm start` (Webpack Dev Server)
- Build: `npm run build`
