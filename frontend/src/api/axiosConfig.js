// frontend/src/api/axiosConfig.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Cambia el puerto si tu backend usa otro
});

export default API;
