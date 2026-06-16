import mongoose from 'mongoose';
import Sale from '../../models/sale/sale.models.js';
import Register from '../../models/register/register.models.js'
import Progress from '../../models/progress/progress.models.js';
import Course from '../../models/course/course.models.js';

class RegisterService {

    async registerFromSale(saleId){

        const session = await mongoose.startSession();

        try {
            
            let result = null;

            await session.withTransaction( async () => {
                
                const sale = await Sale.findById(saleId).session(session);

                if(!sale) throw new Error('Venta no encontrada');

                if(sale.status !== 'completed') throw new Error('La venta no esta completada');

                const course = await Course.findById(sale.courseId).session(session);

                if(!course) throw new Error('Curso no encontrado');

                const registerExists = await Register.findOne({
                    usuarioId: sale.usuarioId,
                    courseId: sale.courseId
                }).session(session);

                if(registerExists) throw new Error('El usuario ya esta registrado en el curso');

                const register = new Register.create(
                    [
                        {
                            usuarioId: sale.usuarioId,
                            courseId: sale.courseId,
                            saleId : sale._id,
                            status : 'active'
                        }
                    ],
                    { session }
                );

                const progress = await Progress.create(
                    [
                        {
                            usuarioId: sale.usuarioId,
                            curseId: sale.courseId,
                            percentage: 0,
                            lessonsCompleted: []
                        }
                    ],
                    { session }
                );

                result = {
                    register: register[0],
                    progress: progress[0]
                }
            });

            return result

        } finally {
            await session.endSession()
        }
    }
}

export default new RegisterService();