import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    fullName : { type: String, required: true },
    email : { type: String, required: true, unique: true },
    password : { type: String, required: true },
    photoPerfil : { type: String, required: true },
    rol : { type: String, enum: ['admin','teacher', 'student'] },
    biografi : { type: String, required: true },
    dateCreation : { type: Date, default: Date.now },
    estadus : { type: Boolean, default: true }
})

export default mongoose.model('Usuario', usuarioSchema);