
import mongoose from "mongoose"
import categoriModel from "../../models/categori/categori.model.js";
import courseModels from "../../models/course/course.models.js";
import paginationHelper from "../../helper/pagination.helper.js";

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
                durationHours,
                instructorId,
                categorId,
                objetives,
                requirements,
                tags,
                status,
                cantStudents
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

            if (!["teacher", "admin"].includes(user.rol)) {
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


            if (!mongoose.Types.ObjectId.isValid(categorId)) {
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
                instructorId: instructorId,
                title: title.trim()
            });

            if (existingCourse) {
                return res.status(400).json({
                    ok: false,
                    message: "Ya existe un curso con ese título"
                });
            }


            /**
             * Crear el curso
            */

            const course = new courseModels({
                title: title.trim(),
                description: description.trim(),
                imagen,
                precio: Number(precio || 0),
                nivel,
                idioma: idioma || "es",
                durationHours : durationHours,
                categorId,
                instructorId: instructorId,
                objetives: objetives || [],
                requirements: requirements || [],
                tags: tags || [],
                status: "borrador",
                cantStudents : cantStudents
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
    },

    listAllCourses : async ( req , res ) => {

        try {
            
            const  { page, limit, ...filters } = req.query;

            const result = await paginationHelper.paginate( courseModels, { 
                page, 
                limit, 
                filter: filters })

            return res.status(200).json({
                ok: true,
                message: "Cursos listados correctamente",
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

export default courseController;