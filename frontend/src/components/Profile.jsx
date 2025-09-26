import React, { useEffect } from "react";
import { Card, CardContent, Avatar, Typography, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const Profile = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <Box>
      <Navbar />
      <Card sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Avatar sx={{ width: 60, height: 60 }}>
              <AccountCircleIcon sx={{ fontSize: 60 }} />
            </Avatar>

            <Box>
              <Typography variant="h6" fontWeight="bold">
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
