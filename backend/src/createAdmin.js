const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // 👈 Importa el modelo User

// Conectar a MongoDB
mongoose.connect("mongodb+srv://Alva:Alvaro12345@negocio-chatbot-cluster.fgi4l.mongodb.net/negocio-chatbot", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(async () => {
    console.log("✅ Conectado a MongoDB");

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
        nombre: "Admin",
        apellidoPaterno: "Prueba",
        apellidoMaterno: "Demo",
        telefono: "1234567890",
        curp: "CURP12345678",
        rfc: "RFC12345678",
        nss: "NSS12345678",
        estadoCivil: "Soltero",
        direccion: "Calle Falsa 123",
        email: "admin@negocio.com",
        password: hashedPassword, // 👈 Aquí se almacena la versión hasheada
        sueldo: 15000,
        gradoEstudios: "Universitario",
        role: "admin",
        intentosFallidos: 0,
        bloqueado: false
    });

    await admin.save();
    console.log("✅ Usuario administrador creado correctamente.");

    mongoose.connection.close();
})
.catch(err => console.log("❌ Error conectando a MongoDB:", err));
