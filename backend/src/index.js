const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// 🔹 Asegúrate de que el nombre del archivo es correcto
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());

// 🔹 Confirma que las rutas están bien registradas
console.log("📌 Registrando rutas en Express...");
app.use("/api/auth", authRoutes);
console.log("✅ Ruta '/api/auth' registrada en Express");

const PORT = 5000;

// 🔹 Conectar a MongoDB asegurando que se usa la base de datos correcta
const MONGO_URI = "mongodb+srv://Alva:Alvaro12345@negocio-chatbot-cluster.fgi4l.mongodb.net/negocio-chatbot?retryWrites=true&w=majority&appName=negocio-chatbot-cluster";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Conectado a MongoDB en la base de datos 'negocio-chatbot'");
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1); // Cerrar la app si falla la conexión
  });

// 🔹 Middleware para capturar rutas incorrectas
app.use((req, res) => {
  console.log(`❌ Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: "Ruta no encontrada" });
});
