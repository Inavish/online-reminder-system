# Online Reminder System

Users can create reminders that will be emailed to them at the scheduled time. The project is split into a Node.js/Express backend and a React frontend.

## Contents

- Project structure
- Getting started
- Environment variables
- Database and migrations
- Backend (API and workers)
- Frontend (components and flows)
- Data flow: updating Upcoming Reminders after create

## Project structure

```
online-reminder-system/
  backend/
    src/
      routes/           # Express routes
      handler/          # Route handlers
      models/           # Database access
      middleware/       # Auth middleware
      workers/          # Cron/processing
      config/           # Knex config
  frontend/
    src/
      components/       # React components (MUI)
      services/         # Axios API client
      redux/            # Store and user state
```

## Getting started

1. Backend

- Install: `cd backend && npm install`
- Create env file (see Environment variables below)
- Run migrations: `npm run migrate`
- Start API (dev): `npm run dev` or (prod): `npm start`

2. Frontend

- Install: `cd frontend && npm install`
- Start dev server: `npm start`
- Build production bundle: `npm run build`

## Environment variables

Backend `.env` (example):

- `PORT=5000`
- `JWT_SECRET=...`
- `DATABASE_URL=...` (or separate `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`)
- Mailer settings as needed by `src/mailer.js`

Frontend `.env` (example):

- `VITE_API_BASE_URL=http://localhost:5000/api` (or equivalent base set in `axiousInit.js`)

## Database and migrations

- Users table: created by `20250925063318_create_users.js`
- Reminders table: created by `20250925063342_create_reminders.js`
- Model access in `backend/src/models/reminder.model.js` using Knex

Key fields in `reminders`:

- `user_id`: owner
- `title`, `description`
- `send_at`: scheduled DateTime (ISO)
- `sent` (boolean), `sent_at` (timestamp when processed)

## Backend

### API routes (all require auth)

- `POST /api/reminders/create`

  - Body: `{ title: string, description?: string, send_at: ISOString }`
  - Validation: rejects past `send_at`
  - Returns: created reminder

- `GET /api/reminders/upcoming`

  - Returns: reminders where `send_at >= now` and `sent = false`, ordered asc

- `GET /api/reminders/past`

  - Returns: reminders where `send_at < now`, ordered desc

- `DELETE /api/reminders/:id`
  - Deletes reminder by id (if exists and belongs to user)

### Processing

- `backend/src/workers/cron.js` schedules a job with `node-cron` to run every minute (`* * * * *`). It calls `processDueReminders()`.
- `backend/src/workers/processReminders.js` finds due reminders, sends emails via Nodemailer, and marks them as sent using `markAsSent`.
- The cron is started from `backend/server.js` after the server begins listening.

## Frontend

### Services

- `frontend/src/services/axiousInit.js`: Axios instance with base URL and auth headers
- `frontend/src/services/reminderService.js`:
  - `createReminder(payload)`
  - `getUpComingReminder()`
  - `getPastReminders()`
  - `deleteReminder(id)`

### Components

- `ReminderForm.jsx`

  - Lets user create a reminder (`title`, `description`, `datetime-local`)
  - Client-side validation prevents selecting a past datetime
  - On success, calls optional `onCreated()` passed from parent

- `UpcomingReminder.jsx`

  - Fetches and displays upcoming reminders
  - Supports Delete action; refetches when `refreshKey` changes

- `PastReminders.jsx`

  - Lists past reminders (read-only with Delete option)

- `Dashboard.jsx`
  - Hosts `ReminderForm`, `UpcomingReminder`, and `PastReminders`
  - Maintains `upcomingRefreshKey` and passes it to `UpcomingReminder`
  - Passes `onCreated` to `ReminderForm` to bump `upcomingRefreshKey` on create

## Data flow: update Upcoming after create

We use a simple refresh-key approach:

1. `Dashboard` holds `upcomingRefreshKey` state.
2. `ReminderForm` receives `onCreated`; after successful create it calls `onCreated()`.
3. Parent increments `upcomingRefreshKey`.
4. `UpcomingReminder` has an effect that refetches when `refreshKey` changes.

This keeps components decoupled and avoids global state for this small feature.

## Validation rules

- Client-side: `ReminderForm` blocks past datetimes and sets the `min` for the picker to current time.
- Server-side: `POST /reminders/create` rejects requests with `send_at < now`.

## Development tips

- Use your browser devtools network tab to verify API calls and payloads
- For date/time issues, log both local time and `toISOString()` on the client
- If your DB is in a different timezone, prefer comparing using UTC consistently

## License

See `LICENSE`.
