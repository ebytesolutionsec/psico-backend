import mongoose from "mongoose";
import courseModels from "../../models/course/course.models.js";
import paymentMethodModels from "../../models/paymethod/payment.method.model.js"
import registerModel from "../../models/register/register.models.js"
import saleModel from "../../models/sale/sale.models.js"
import progressModel from "../../models/progress/progress.models.js"

const saleController = {

    buyCourse : async ( req , res ) => {

        const session = await mongoose.startSession();
        session.startTransaction()

        try {
            
            const usuarioId = req.user._id
            const { courseId, paymentMethodId, reference } = req.body;


            /**
             * Validar Campos obligatorios
             */

            if(!courseId || !paymentMethodId || !reference){
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    success : false,
                    message : "Existen campos obligatorios revice nuevamente"
                })
            }

            /**
             * Verificar que el curso existe y esta activo
             */

            const course = await courseModels.findById( courseId ).session(session)
            if(!course){
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({
                    success : false,
                    message : "Curso no encontrado"
                })
            }

            /**
             * Verificar que el metodo de pago exista
             */

            const paymentMethod = await paymentMethodModels.findById(paymentMethodId).session(session)
            if(!paymentMethod){
                await session.abortTransaction()
                session.endSession();
                return res.status(409).json({
                    success : false,
                    message : "Método de pago no encontrado"
                })
            }

            /**
             * Verificar que el usuario ya no este registrado en el curso
             */

            const exitingRegister = await registerModel.findOne({ usuarioId, courseId }).session(session)

            if(exitingRegister){
                await session.abortTransaction()
                session.endSession()
                return res.status(409).json({
                    success : false,
                    message : "El usuario ya se encuentra registrado en el sistema"
                })
            }

            /**
             * Crear la venta con el esta de "Completado"
             */

            const [sale] = await saleModel.create(
                [
                    {
                        usuarioId,
                        courseId,
                        mont: course.precio,
                        paymentMethod:paymentMethodId,
                        status: "completed",
                        reference
                    }
                ],
                {session}
            )

            /**
             * Crear el registro del usuario en el curso
             */

            const now = new Date()
            const [register] = await registerModel.create(
                [
                    {
                        usuarioId,
                        courseId,
                        saleId: sale._id,
                        status:'activate',
                        dateRegister: now,
                        dateCreation: now,
                        dateUpdate: now
                    }
                ],
                {session}
            )

            /**
             * Iniciar el progreso del estudiante
             */

            const [progress] = await progressModel.create(
                [
                    {
                        usuarioId,
                        cursoId:courseId,
                        lessonCompleted:[],
                        percentage: 0,
                        lastLessonCompleted: null,
                        dateCreation:now,
                        dateUpdate: now
                    }
                ],
                {session}
            )

            /**
             * Confirmar la transaccion
             */

            await session.commitTransaction();
            session.endSession();

            return res.status(201).json({
                success : true,
                message : "Compra y registro realizada exitosamente",
                data : {
                    sale,
                    register,
                    progress
                }
            })
        } catch (error) {
            await session.abortTransaction();
            session,endSession();

            if (error.code === 11000) {
                return res.status(409).json({
                    success: false,
                    message: 'El usuario ya tiene un registro o progreso en este curso.',
                });
            }
    
            console.error('[purchaseCourse]', error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor.',
                error: error.message,
            });

        }
    }
}