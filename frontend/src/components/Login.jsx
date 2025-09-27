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
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions/userActions";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    authService
      .login({ email, password })
      .then((res) => {
        alert("Login successful!");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(setUser(res.data.user));
        localStorage.setItem("token", res?.data?.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err);
        alert(err?.response?.data?.error || "Login failed");
      })
      .finally(() => {
        setLoading(false); // stop loader
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
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} maxWidth={400} width="100%">
        <Stack spacing={2}>
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
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Stack>
      </Box>

      <Typography mt={2}>
        Don&apos;t have an account?
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
