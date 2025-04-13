const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  producto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
