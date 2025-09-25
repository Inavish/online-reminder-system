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
