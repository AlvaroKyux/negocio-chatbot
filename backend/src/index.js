require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./config/db'); // Conexión a MongoDB

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('¡Bienvenido al API del negocio chatbot!');
});

// Levantar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
