const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("📌 Se recibió una petición POST en /api/auth/login");
        console.log(`📌 Buscando usuario con email: ${email}`);

        
        const user = await User.findOne({
            email: { $regex: `^${email.trim()}$`, $options: "i" }
        });

        console.log("📌 Usuario encontrado:", user);

        if (!user) {
            console.log("❌ Usuario no encontrado en la base de datos.");
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        if (user.bloqueado) {
            console.log("❌ Usuario bloqueado.");
            return res.status(403).json({ message: "Cuenta bloqueada por intentos fallidos" });
        }

        console.log("🔍 Contraseña ingresada:", password);
        console.log("🔐 Contraseña almacenada en BD:", user.password);

        
        console.log("🔑 Verificando contraseña...");
        if (password !== user.password) {
            console.log("❌ Contraseña incorrecta.");
            user.intentosFallidos += 1;
            if (user.intentosFallidos >= 3) {
                user.bloqueado = true;
                console.log("⛔ Cuenta bloqueada por intentos fallidos.");
            }
            await user.save();
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        
        user.intentosFallidos = 0;
        await user.save();

        
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "secreto", {
            expiresIn: "1h",
        });

        console.log("✅ Usuario autenticado correctamente.");

        
        res.json({ token, message: "Inicio de sesión exitoso", role: user.role });
    } catch (error) {
        console.error("❌ Error en el servidor:", error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
};
