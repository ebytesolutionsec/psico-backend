import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    usuarioId : { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    courseId : { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    mont : { type: Number, required: true },
    paymentMethod : { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod', required: true },
    status : { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    reference : { type: String, required: true },

})

export default mongoose.model('Sale', saleSchema);