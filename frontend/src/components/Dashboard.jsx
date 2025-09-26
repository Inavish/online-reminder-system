import { useState } from "react";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import ReminderForm from "./ReminderForm";
import UpcomingReminder from "./UpcomingReminder";
import PastReminders from "./PastReminders";

const Dashboard = () => {
  const [upcomingRefreshKey, setUpcomingRefreshKey] = useState(0);
  const handleReminderCreated = () => setUpcomingRefreshKey((k) => k + 1);
  return (
    <Box>
      <Navbar />
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }} // column on mobile, row on desktop
        gap={3}
        p={2}
        height={{ xs: "auto", md: "calc(100vh - 64px)" }}
      >
        {/* Reminder Form */}
        <Box flex={{ xs: "auto", md: 1 }} width={{ xs: "100%", md: "auto" }}>
          <ReminderForm onCreated={handleReminderCreated} />
        </Box>

        {/* Upcoming Reminders */}
        <Box
          flex={{ xs: "auto", md: 1 }}
          width={{ xs: "100%", md: "auto" }}
          height={{ xs: "auto", md: "100%" }}
        >
          <UpcomingReminder refreshKey={upcomingRefreshKey} />
        </Box>

        {/* Past Reminders */}
        <Box
          flex={{ xs: "auto", md: 1 }}
          width={{ xs: "100%", md: "auto" }}
          height={{ xs: "auto", md: "100%" }}
        >
          <PastReminders />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
