import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    cursoId : { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    moduleId : { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
    title : { type : String, required: true },
    description : { type : String, required: true },
    type : { type : String, enum : ['video','texto','pdf','quiz']},
    content : {
        videoUrl: String,
        texto: String,
        pdfUrl: String,
        quiz: {
            questions: [
                {
                    question: String,
                    options: [String],
                    correctAnswer: String
                }
            ]
        }
    }, 
    duracion: { type: Number, default: 0 },
    orden : { type : Number, required: true }
})

export default mongoose.model('Lesson', lessonSchema);