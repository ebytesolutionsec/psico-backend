import paymentMethodModel from "../../models/paymethod/payment.method.model.js";
import paginationHelper from "../../helper/pagination.helper.js";


const paymentMethodController = {

    createPaymentMethod : async ( req, res ) => {
        try {
            
            const { name, provider, active, config } = req.body;

            //Validaciones
            if (!name || !provider) {
                return res.status(400).json({
                    message: 'El nombre y el proveedor son obligatorios'
                });
            }

            //Evitar duplicados
            const exists = await paymentMethodModel.findOne({
                name: name.trim(),
                provider: provider.trim()
            });

            if (exists) {
                return res.status(409).json({
                    message: 'El método de pago ya existe'
                });
            }

            const paymentMethod = await paymentMethodModel.create({
                name: name.trim(),
                provider: provider.trim(),
                active: active !== undefined ? active : true,
                config
            });

            return res.status(201).json({
                message: 'Método de pago creado correctamente',
                paymentMethod
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Error al crear el método de pago',
                error: error.message
            });
        }
    },

    listPaymentMethod : async ( req, res ) => {
        try {
            
            const { page, limit, ...filters } = req.query

            const result = await paginationHelper.paginate(paymentMethodModel,{
                page, 
                limit, 
                filter: filters,
            })

            res.json(result)

        } catch (error) {
            res.status(500).json({ message: "Error al listar los pagos", error });
        }
    },

    editPaymentMethod : async ( req , res ) => {
        try {
            
            const { ... rest } = req.body

            const paymentMethod = await paymentMethodModel.findByIdAndUpdate(
                req.params.id,
                { ...rest }
            )

            if(!paymentMethod){
                return res.status(404).json({ message : "Metodo de pago no encontrado"})
            }

            res.status(200).json({ 
                message: "Metodo de pago actualizado exitosamente", 
                paymentMethod 
            });

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error al editar el método de pago", error: error})
        }
    },

    deletePaymentMethod : async ( req , res ) => {
        try {

            const paymentMethod = await paymentMethodModel.findByIdAndDelete(req.params.id)

            if(!paymentMethod){
                return res.status(404).json({ message: "Método de pago no encontrado" })
            }

            res.status(200).json({ message: "Método de pago eliminado exitosamente" })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error al eliminar el método de pago", error: error})
        }
    }
}

export default paymentMethodController;