const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productosRouter = require("./routes/productos");
const userRoutes = require("./routes/userRoutes");
const ordersRouter = require("./routes/orders");

const app = express();

app.use(express.json());
app.use(cors());

console.log("📌 Registrando rutas en Express...");
app.use("/api/auth", authRoutes);
console.log("✅ Ruta '/api/auth' registrada en Express");

app.use("/api/productos", productosRouter);
console.log("✅ Ruta '/api/productos' registrada en Express");

app.use("/api/usuarios", userRoutes);
console.log("✅ Ruta '/api/usuarios' registrada en Express");

app.use("/api/orders", ordersRouter);
console.log("✅ Ruta '/api/orders' registrada en Express");

const PORT = 5000;


const MONGO_URI =
  "mongodb+srv://Alva:Alvaro12345@negocio-chatbot-cluster.fgi4l.mongodb.net/negocio-chatbot?retryWrites=true&w=majority&appName=negocio-chatbot-cluster";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Conectado a MongoDB en la base de datos 'negocio-chatbot'");
    app.listen(PORT, () =>
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1); 
  });


app.use((req, res) => {
  console.log(`❌ Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: "Ruta no encontrada" });
});
