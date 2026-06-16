import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    fullName : { type: String, required: true },
    dni : { type: String, required: true, unique: true },
    email : { type: String, required: true, unique: true },
    password : { type: String, required: true },
    photoPerfil : { type: String },
    rol : { type: String, enum: ['admin','teacher', 'student'] },
    biografi : { type: String },
    dateCreation : { type: Date, default: Date.now },
    estadus : { type: Boolean, default: true }
})

export default mongoose.model('Usuario', usuarioSchema);