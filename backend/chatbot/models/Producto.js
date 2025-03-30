const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema({
    nombre: String,
    modelo: String,
    precio: Number,
    cantidad: Number
});

module.exports = mongoose.model("Producto", ProductoSchema);
