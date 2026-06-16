
import registerModule from "../../models/register/register.models";
import registerService from "../../services/register/register.service";

const registerController = {

    registerCourse : async (req, res) => {
        try {
            
            const { saleId } = req.body;

            if(!saleId){
                return res.status(400).json({
                    success : false,
                    message : "Sale Id es requerido"
                })
            }

            const result = await registerService.registerFromSale(saleId)

            return res.status(201).json({
                success: true,
                message: 'Curso matriculado correctamente',
                data: result
            });

            
        } catch (error) {
            const statusCode =
                error.message.includes('no encontrada') ? 404 :
                error.message.includes('no encontrado') ? 404 :
                error.message.includes('matriculado') ? 409 :
                400;

            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }
}


export default registerController;