import mongoose from "mongoose";

const categoriSchema = new mongoose.Schema({
    name : { type: String, required: true },
    description : { type: String, required: true },
    estadus : { type: Boolean, default: true }
})

export default mongoose.model('Categori', categoriSchema);