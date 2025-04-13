const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Crear orden
router.post("/", async (req, res) => {
  try {
    const nuevaOrden = new Order(req.body);
    await nuevaOrden.save();
    res.status(201).json(nuevaOrden);
  } catch (err) {
    res.status(400).json({ message: "Error al crear orden", err });
  }
});

// Obtener todas las órdenes
router.get("/", async (req, res) => {
  try {
    const ordenes = await Order.find();
    res.json(ordenes);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener órdenes", err });
  }
});

// Obtener por ID
router.get("/:id", async (req, res) => {
  try {
    const orden = await Order.findById(req.params.id);
    if (!orden) return res.status(404).json({ message: "Orden no encontrada" });
    res.json(orden);
  } catch (err) {
    res.status(500).json({ message: "Error al buscar orden", err });
  }
});

// Actualizar orden
router.put("/:id", async (req, res) => {
  try {
    const ordenActualizada = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(ordenActualizada);
  } catch (err) {
    res.status(400).json({ message: "Error al actualizar", err });
  }
});

// Eliminar orden
router.delete("/:id", async (req, res) => {
  try {
    const eliminada = await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Orden eliminada" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar", err });
  }
});

module.exports = router;
