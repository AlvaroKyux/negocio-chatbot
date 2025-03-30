const mongoose = require("mongoose");

const conectarDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://Alva:Alvaro12345@negocio-chatbot-cluster.fgi4l.mongodb.net/negocio-chatbot?retryWrites=true&w=majority&appName=negocio-chatbot-cluster");
        console.log("✅ Conectado a MongoDB desde el chatbot");
    } catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error);
    }
};

module.exports = conectarDB;
