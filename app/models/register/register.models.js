import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    usuarioId : { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    courseId : { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    saleId : { type: mongoose.Schema.Types.ObjectId, ref: 'Sale', required: true },
    status : { type: String, enum: ['active','completed', 'cancelled'] },
    dateRegister : { type: Date, default: Date.now },
    dateCreation : { type: Date, default: Date.now },
    dateUpdate : { type: Date, default: Date.now }
})

registerSchema.index({ usuarioId: 1, courseId: 1 }, { unique: true });

export default mongoose.model('Register', registerSchema);