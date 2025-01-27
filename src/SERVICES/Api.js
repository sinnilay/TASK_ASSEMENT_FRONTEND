import axios from "axios";

const API = axios.create({
  baseURL: "https://task-assement-backend.vercel.app", // Replace with your backend URL
});

// User APIs
export const submitUserData = (data) => API.post("/user/api/submit", data);
export const getAllUsers = () => API.get("/user/api/users");

// Admin APIs
export const loginAdmin = (credentials) => API.post("/admin/api/login", credentials);
