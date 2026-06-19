
import categoriModel from "../../models/categori/categori.model.js";
import paginationHelper from "../../helper/pagination.helper.js";
import { W } from "@angular/cdk/keycodes";

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
    },

    listAllCategories : async ( req , res ) => {
        try {
            
            const  { page, limit, ...filters } = req.query;

            const result = await paginationHelper.paginate( categoriModel, { 
                page, 
                limit, 
                filter: filters })

            return res.status(200).json({
                ok: true,
                message: "Categorías obtenidas correctamente",
                data: result
            })

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                ok: false,
                message: "Error interno del servidor"
            });
        }
    },

    editCategori: async ( req, res ) => {
        try {
            
            const { name, ...rest } = req.body

            if(name){
                const existName = await categoriModel.findOne({ name, _id: { $ne: req.params.id } })
                
                if(existName){
                    return res.status(409).json({
                        ok : false,
                        message : "El nombre de la categoria ya esta registrado"
                    })
                }

                const categori = await categoriModel.findByIdAndUpdate(
                    req.params.id,
                    rest,
                    { new : true }
                )

                if (!categori){
                    return res.status(404).json({
                        ok : false,
                        message : "Categoria no encontrada"
                    })
                }

                res.status(200).json({
                    ok : true,
                    message : "Categoria editada exitosamente"
                })
            
            }

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