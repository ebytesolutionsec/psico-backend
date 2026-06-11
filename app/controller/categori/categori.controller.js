
import categoriModel from "../../models/categori/categori.model.js";

const categoriController = {
    
    createCategori : async ( req , res ) =>{
        try {
            
            const {
                name,
                description,
                status
            } = req.body

            if (!name || !description || !status) {
                return res.status(400).json({
                    ok: false,
                    message: "Los datos son obligatorios"
                });
            }

            const categori = new categoriModel({
                name,
                description,
                status
            })

            await categori.save()

            return res.status(201).json({
                ok: true,
                message: "Categoria creada exitosamente",
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

export default categoriController