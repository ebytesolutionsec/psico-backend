import moduleCourseModels from "../../models/modulecourse/module.course.models.js";
import courseModels from "../../models/course/course.models.js";

const moduleCourseController = {

    createModuleCourse : async ( req , res ) => {
        try {
            
            const { cursoId, titulo, descripcion, orden } = req.body;

            const user = req.user

            if(!mongoose.Types.ObjectId.isValid(cursoId)){
                return res.status(400).json({
                    ok: false,
                    message: "Curso no válido"
                });
            }

            const course = await courseModels.findById(cursoId);

            if (!course) {
                return res.status(404).json({
                    ok: false,
                    message: "El curso no existe"
                });
            }

            /**
             * Validar propietario
            */
            if(course.instructorId.toString() !== user._id.toString() && user.role !== "administrador"){
                return res.status(403).json({
                    ok: false,
                    message: "No tienes permisos sobre este curso"
                });
            }

            let order = orden

            if (!order) {
                const modulesCount = await moduleCourseModels.countDocuments({ cursoId });
                order = modulesCount + 1
            }

            const moduleExisting = await moduleCourseModels.findOne({ cursoId, titulo: titulo.trim() });

            if (moduleExisting) {
                return res.status(400).json({
                    ok: false,
                    message: "Ya existe un módulo con ese título en este curso"
                });
            }

            const module = await moduleCourseModels.create({
                cursoId,
                titulo: titulo.trim(),
                descripcion,
                orden: order
            });

            return res.status(201).json({
                ok: true,
                message: "Módulo creado exitosamente",
                module
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

export default moduleCourseController;