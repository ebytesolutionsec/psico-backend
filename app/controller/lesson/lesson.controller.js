
import courseModels from "../../models/course/course.models.js";
import moduleCourseModels from "../../models/modulecourse/module.course.models.js";
import lessonModels from "../../models/lesson/lesson.models.js";
import paginationHelper from "../../helper/pagination.helper.js";

const lessonController = {

    createLesson: async (req, res) => {
        try {
            const { 
                courseId,
                title,
                description,
                type,
                moduleId,
                content,
                duracion,
                orden 
            } = req.body;

            const user = req.user;

            if(!moongoose.Types.ObjectId.isValid(courseId)  ){
                    return res.status(400).json({
                    ok: false,
                    message: "Curso inválido"
                });
            }

            if(!moongoose.Types.ObjectId.isValid(moduleId)  ){
                    return res.status(400).json({
                    ok: false,
                    message: "Módulo inválido"
                });
            }

            const course = await courseModels.findById(courseId);

            if (!course) {
                return res.status(404).json({
                    ok: false,
                    message: "El curso no existe"
                });
            }

            if(course.instructorId.toString() !== user._id.toString() && user.role !== 'admin'){
                return res.status(403).json({
                    ok: false,
                    message: "No tienes permiso para crear lecciones en este curso"
                });
            }

            const module = await moduleCourseModels.findById(moduleId);

            if (!module) {
                return res.status(404).json({
                    ok: false,
                    message: "El módulo no existe"
                });
            }

            if(module.cursoId.toString() !== courseId){
                return res.status(400).json({
                    ok: false,
                    message: "El módulo no pertenece a este curso"
                });
            }

            const tipesPermitidos = ['video', 'texto', 'pdf', 'quiz'];

            if (!tipesPermitidos.includes(type)) {
                return res.status(400).json({
                    ok: false,
                    message: "Tipo de lección inválido"
                });
            }

            /**
             * Validaciones por tipo
            */

            switch (type) {
                case 'video':
                    if (!content.videoUrl) {
                        return res.status(400).json({
                            ok: false,
                            message: "URL del video es requerida"
                        });
                    }
                    break;
                case 'texto':
                    if (!content.text) {
                        return res.status(400).json({
                            ok: false,
                            message: "El texto es requerido"
                        });
                    }
                    break;
                case 'pdf':
                    if (!content.pdfUrl) {
                        return res.status(400).json({
                            ok: false,
                            message: "URL del PDF es requerida"
                        });
                    }
                    break;
                case 'quiz':
                    if (!content.questions || !Array.isArray(content.questions)) {
                        return res.status(400).json({
                            ok: false,
                            message: "Las preguntas del quiz son requeridas"
                        });
                    }
                
                break;
            }

            let lessonOrder = orden;

            if (!lessonOrder) {
                const countLessons = await lessonModels.countDocuments({
                    moduloId
                });

                lessonOrder = countLessons + 1;
            }

            const lesson = await lessonModels.create({
                cursoId,
                moduloId,
                titulo: titulo.trim(),
                descripcion,
                tipo,
                contenido,
                duracion: duracion || 0,
                esGratis: esGratis || false,
                orden: lessonOrder
            });

            return res.status(201).json({
                ok: true,
                message: "Lección creada exitosamente",
                data: lesson
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                ok: false,
                message: "Error interno del servidor"
            });

        }
    },

    listAllLessons: async (req, res) => {

        try {
            
            const { page, limit, ...filters } = req.query;

            const result = await paginationHelper.paginate( lessonModels, { 
                page, 
                limit, 
                filter: filters })
            return res.status(200).json({
                ok: true,
                message: "Lecciones listadas correctamente",
                data: result
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                ok: false,
                message: "Error interno del servidor"
            });
        }
    }
}

export default lessonController;