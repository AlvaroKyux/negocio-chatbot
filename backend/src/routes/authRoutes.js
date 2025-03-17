const express = require("express");
const { login } = require("../controllers/authController");

const router = express.Router();

console.log("📌 Definiendo rutas en authRoutes.js");

router.post("/login", (req, res) => {
    console.log("📌 Se recibió una petición POST en /api/auth/login");
    login(req, res);
});

module.exports = router;
