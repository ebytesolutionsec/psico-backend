import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    usuarioId : { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    courseId : { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    qualification : { type: Number, required: true },
    comment : { type: String },
    dateCreation : { type: Date, default: Date.now },
    dateUpdate : { type: Date, default: Date.now }
})

export default mongoose.model('Review', reviewSchema);