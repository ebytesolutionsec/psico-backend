import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    cursoId : { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    titulo : { type: String, required: true },
    orden : { type : Number, required: true }
})

export default mongoose.model('Module', moduleSchema);