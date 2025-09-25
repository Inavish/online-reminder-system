import axios from "axios";

// Base URL from environment variables
const API_URL = process.env.REACT_APP_API_URL;

// Create an Axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or from Redux/Context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
