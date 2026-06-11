
import categoriModel from "../../models/categori/categori.model.js";
import courseModels from "../../models/course/course.models.js";

const courseController = {

    createCourse : async ( req , res ) => {
        try {
            
            const {
                title,
                description,
                imagen,
                precio,
                nivel,
                idioma,
                categorId,
                objetives,
                tags
            } = req.body;

            /**
             * Verificar si el usuario esta autenticado
            */

            const user = req.user

            if(!user){
                return res.status(401).json({
                    ok: false,
                    message: "Usuario no autenticado"
                });
            }

            /**
             * Roles permitidos
            */

            if (!["instructor", "administrador"].includes(user.rol)) {
                return res.status(403).json({
                    ok: false,
                    message: "No tienes permisos para crear cursos"
                });
            }

            /**
             * Verificar campos obligatorios
            */
            if (!title ||
                !description ||
                !categorId ||
                !nivel) {
                return res.status(400).json({
                    ok: false,
                    message: "Los datos son obligatorios"
                });
            }

            /**
             * Validar Categoria existente
            */


            if (!mongoose.Types.ObjectId.isValid(categoriaId)) {
                return res.status(400).json({
                    ok: false,
                    message: "Categoría inválida"
                });
            }

            const category = await categoriModel.findById(categorId)

            if (!category) {
                return res.status(404).json({
                    ok: false,
                    message: "La categoría no existe"
                });
            }

            /**
             * Validar Nivel
            */


            const nivelesPermitidos = [
                "principiante",
                "intermedio",
                "avanzado"
            ];

            if (!nivelesPermitidos.includes(nivel)) {
                return res.status(400).json({
                    ok: false,
                    message: "Nivel inválido"
                });
            }

            /**
             * Validar Precio
            */

            if (precio !== undefined) {
                if (isNaN(precio) || Number(precio) < 0) {
                    return res.status(400).json({
                    ok: false,
                    message: "El precio debe ser mayor o igual a 0"
                    });
                }
            }

            /**
             * Evitar cursos duplicados
            */

            const existingCourse = await courseModels.findOne({
                instructorId: user._id,
                titulo: titulo.trim()
            });

            if (existingCourse) {
                return res.status(409).json({
                    ok: false,
                    message: "Ya existe un curso con ese título"
                });
            }


            /**
             * Crear el curso
            */

            const course = new courseModels({
                titulo: titulo.trim(),
                descripcion: descripcion.trim(),
                imagen,
                precio: Number(precio || 0),
                nivel,
                idioma: idioma || "es",
                categoriaId,
                instructorId: user._id,
                objetivos: objetivos || [],
                requisitos: requisitos || [],
                tags: tags || [],
                estado: "borrador"
            });

            await course.save()

            return res.status(201).json({
                ok: true,
                message: "Curso creado correctamente",
                data: course
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

export default courseController;