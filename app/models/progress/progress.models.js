import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
    usuarioId : { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    cursoId : { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    lessonCompleted : [
        {
            lessonId : { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
            dateCompleted : { type: Date, default: Date.now }
        }
    ],
    percentage : { type: Number, default: 0 },
    lastLessonCompleted : { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
    dateCreation : { type: Date, default: Date.now },
    dateUpdate : { type: Date, default: Date.now }
})

progressSchema.index({ usuarioId: 1, cursoId: 1 }, { unique: true });

export default mongoose.model('Progress', progressSchema);