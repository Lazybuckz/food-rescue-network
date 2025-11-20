import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
};

// Donors API
export const donorsAPI = {
  getAll: () => api.get("/donors"),
  getOne: (id) => api.get(`/donors/${id}`),
  create: (data) => api.post("/donors", data),
  update: (id, data) => api.put(`/donors/${id}`, data),
  delete: (id) => api.delete(`/donors/${id}`),
};

// Volunteers API
export const volunteersAPI = {
  getAll: () => api.get("/volunteers"),
  getOne: (id) => api.get(`/volunteers/${id}`),
  create: (data) => api.post("/volunteers", data),
  update: (id, data) => api.put(`/volunteers/${id}`, data),
  delete: (id) => api.delete(`/volunteers/${id}`),
};

// Donations API
export const donationsAPI = {
  getAll: () => api.get("/donations"),
  getOne: (id) => api.get(`/donations/${id}`),
  create: (data) => api.post("/donations", data),
  update: (id, data) => api.put(`/donations/${id}`, data),
  delete: (id) => api.delete(`/donations/${id}`),
  getStats: () => api.get("/donations/stats/overview"),
};

export default api;
