const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    nombre: String,
    apellidoPaterno: String,
    apellidoMaterno: String,
    telefono: String,
    curp: String,
    rfc: String,
    nss: String,
    estadoCivil: String,
    direccion: String,
    email: { type: String, required: true, unique: true, trim: true }, 
    password: { type: String, required: true },
    sueldo: Number,
    gradoEstudios: String,
    role: { type: String, enum: ["admin", "empleado"], required: true },
    intentosFallidos: { type: Number, default: 0 },
    bloqueado: { type: Boolean, default: false },
}, {collection: "users"});

// Middleware para encriptar contraseña antes de guardar
//userSchema.pre("save", async function (next) {
//    if (!this.isModified("password")) return next();
//    this.password = await bcrypt.hash(this.password, 10);
//    next();
//});


module.exports = mongoose.model("User", userSchema); 
