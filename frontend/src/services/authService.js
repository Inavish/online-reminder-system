import { api } from "./axiousInit";

const signUp = (payload) => {
  return api.post("/auth/signup", payload);
};

const login = (payload) => {
  return api.post("/auth/login", payload);
};

// Auth API methods
export const authService = {
  login,
  signUp,
};
