import { Box, Button, Stack, Typography, Paper } from "@mui/material";
import { Alarm } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 6,
          borderRadius: 4,
          textAlign: "center",
          backgroundColor: "rgba(255,255,255,0.9)",
          maxWidth: 480,
        }}
      >
        <Alarm color="primary" sx={{ fontSize: 60, mb: 2 }} />

        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Reminder System
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" mb={4}>
          Stay on top of your tasks and never miss an important reminder again.
        </Typography>

        <Stack spacing={2} direction="row" justifyContent="center">
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={handleLogin}
            sx={{ px: 4, borderRadius: 3 }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            onClick={handleSignup}
            sx={{ px: 4, borderRadius: 3 }}
          >
            Sign Up
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default WelcomePage;
