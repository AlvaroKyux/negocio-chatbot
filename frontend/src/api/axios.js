import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Ajusta si usas otro puerto o dominio
});

// Agrega un token automáticamente a cada petición
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
