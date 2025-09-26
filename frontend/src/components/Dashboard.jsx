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
      <Box display="flex" gap={3} p={3} height="calc(100vh - 64px)">
        <Box flex={1}>
          <ReminderForm onCreated={handleReminderCreated} />
        </Box>

        <Box flex={1} height="100%">
          <UpcomingReminder refreshKey={upcomingRefreshKey} />
        </Box>
        <Box flex={1} height="100%">
          <PastReminders />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
