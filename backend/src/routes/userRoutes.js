const express = require("express");
const {
  protegerRuta,
  verificarAdmin,
} = require("../middlewares/authMiddleware");
const User = require("../models/User");
const router = express.Router();

//Obtener todos los usuarios (solo admin)
router.get("/", protegerRuta, verificarAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
});

//Crear un nuevo usuario
router.post("/", protegerRuta, verificarAdmin, async (req, res) => {
  try {
    const nuevoUsuario = new User(req.body);
    await nuevoUsuario.save();
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al crear usuario", error });
  }
});

//Actualizar un usuario por ID
router.put("/:id", protegerRuta, verificarAdmin, async (req, res) => {
  try {
    const usuarioActualizado = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!usuarioActualizado)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar usuario", error });
  }
});

//Eliminar un usuario por ID
router.delete("/:id", protegerRuta, verificarAdmin, async (req, res) => {
  try {
    const eliminado = await User.findByIdAndDelete(req.params.id);
    if (!eliminado)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
});

module.exports = router;
