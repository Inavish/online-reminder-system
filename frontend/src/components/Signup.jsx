// src/components/Signup.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Link,
  CircularProgress,
} from "@mui/material";
import { authService } from "../services/authService";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    authService
      .signUp({ name, email, password })
      .then(() => {
        navigate("/login");
        alert("ok");
      })
      .catch((err) => {
        console.error("Failed to sign up:", err);
        alert(err?.response?.data?.error || "Signup failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      p={3}
    >
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>
      <Box component="form" onSubmit={handleSubmit} maxWidth={400} width="100%">
        <Stack spacing={2}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            variant="outlined"
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </Stack>
      </Box>

      <Typography mt={2}>
        Already have an account?{" "}
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/login")}
        >
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default Signup;
