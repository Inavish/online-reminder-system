import React from "react";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import ReminderForm from "./ReminderForm";
import UpcomingReminder from "./UpcomingReminder";

const Dashboard = () => {
  return (
    <Box>
      <Navbar />
      <Box display="flex" gap={3} p={3} height="calc(100vh - 64px)">
        <Box flex={1}>
          <ReminderForm />
        </Box>

        <Box flex={1} height="100%">
          <UpcomingReminder />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
