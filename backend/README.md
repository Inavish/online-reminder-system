# Backend (Node.js + Express + Knex)

This service provides the REST API and background processing for the Online Reminder System.

## Prerequisites

- Node.js 18+
- A PostgreSQL-compatible database (or whichever DB your Knex config targets)

## Setup

1. Install dependencies:

```
npm install
```

2. Configure environment variables (create a `.env` in `backend/`):

- `PORT=5000`
- `JWT_SECRET=your-secret`
- `DATABASE_URL=postgres://user:pass@host:5432/dbname` (or use discrete `DB_*` vars per your `src/config/knexfile.js`)
- Mailer settings as required by `src/mailer.js` (SMTP host, user, password, from, etc.)

3. Run database migrations:

```
knex migrate:latest --knexfile src/config/knexfile.js
```

4. Start the API:

```
npm start
```

## Project layout

```
src/
  routes/            # Express routes
  handler/           # Route handlers (controllers)
  models/            # Knex queries and DB helpers
  middleware/        # Auth middleware
  workers/           # Cron/queue-like processors
  config/knexfile.js # Knex configuration
server.js            # App bootstrap
```

## API endpoints (all require auth)

Base path is typically `/api` (see `server.js`):

- POST `/reminders/create`

  - Body: `{ title: string, description?: string, send_at: ISOString }`
  - Validation:
    - `title` and `send_at` required
    - `send_at` must be in the future
  - Response: created reminder

- GET `/reminders/upcoming`

  - Returns reminders with `send_at >= now` and `sent = false`, ordered by `send_at` ascending

- GET `/reminders/past`

  - Returns reminders with `send_at < now`, ordered by `send_at` descending

- DELETE `/reminders/:id`
  - Deletes the reminder by id (only if it exists and belongs to the authenticated user)

See `src/routes/reminderRoutes.js` and `src/handler/reminderHandler.js` for details.

## Models

Located in `src/models/`. Key functions in `reminder.model.js`:

- `createReminderInDb(reminderData)`
- `getUpComingReminderFromDb(user)`
- `getPastRemindersFromDb(user)`
- `getDueReminders(now)` and `markAsSent(reminderId)` for background processing

## Background processing

`src/workers/cron.js` schedules a cron job using `node-cron` with the expression `* * * * *` (every minute). On each tick, it calls `processDueReminders()`.

`src/workers/processReminders.js` queries for due reminders (`send_at <= now` and `sent = false`), sends emails via Nodemailer (`sendReminderEmail`), and marks reminders as sent (`markAsSent`).

The cron is started from `server.js` after the Express server starts listening.
