const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
  modelo: { type: String, required: true },
  
});

module.exports = mongoose.model("Producto", productoSchema);
