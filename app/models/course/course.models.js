import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title : { type: String, required: true },
    description : { type: String, required: true },
    imagen : { type : String },
    precio : { type: Number, required: true },
    nivel : { type: String, enum: ['principiante','intermedio', 'experto'] },
    idioma : { type : String, default: "es" },
    durationHours : { type : Number, required: true },
    instructorId : { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    categorId : { type: mongoose.Schema.Types.ObjectId, ref: 'Categori', required: true },
    objetives: [String],
    tags : [String],
    requirements : [String],
    status : { type: String, enum: ['publish','review', 'archivado', 'borrador'] },
    cantStudents : { type : Number },
    dateCreation : { type: Date, default: Date.now },
    dateUpdate : { type: Date, default: Date.now }
})

export default mongoose.model('Course', courseSchema);