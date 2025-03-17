const express = require('express');
const { protegerRuta, verificarAdmin } = require('../middlewares/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// Obtener todos los usuarios (solo admin)
router.get('/', protegerRuta, verificarAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
});

module.exports = router;
