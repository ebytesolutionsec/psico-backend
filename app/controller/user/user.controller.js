
import userModel from "../../models/user/user.model.js";
import paginationHelper from "../../helper/pagination.helper.js";
import bcrypt from 'bcrypt';

const userController = {
    
    createUser : async ( req, res) => {
        try {
            
            const {
                dni,
                fullName,
                email,
                password,
                rol,
                biografia
            } = req.body;



            if (!fullName || !email || !password || !dni) {
                return res.status(400).json({
                    ok: false,
                    message: "fullName, email y password son obligatorios"
                });
            }

            //Verify exist user
            const userExist = await userModel.findOne({ dni })

            if(userExist){
                return res.status(409).json({
                    ok: false,
                    message : "Usuario ya registrado"
                })
            }

            if( dni.length > 10 ){
                return res.status(400).json({
                    ok : false,
                    message : "La cédula debe tener 10 dígitos"
                })
            }

            //Verify exist email
            const userEmailExist = await userModel.findOne({ email })

            if(userEmailExist){
                return res.status(409).json({
                    ok: false,
                    message : "Este correo electrónico ya ha sido registrado"
                })
            }

            /**
             * Encrip password
            */

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            /**
             * Create User
            */

            const user = new userModel({
                dni,
                fullName,
                email,
                password: hashedPassword,
                rol,
                biografia
            })

            await user.save();

            return res.status(201).json({
                ok: true,
                message: "Usuario creado correctamente",
                data: {
                    id: user._id,
                    dni : dni,
                    fullName: user.fullName,
                    email: user.email,
                    rol: user.rol
                }
            });

        } catch (error) {
            
            console.error(error);

            return res.status(500).json({
                ok: false,
                message: "Error interno del servidor"
            });

        }
    },

    listAllUsers : async ( req , res ) => {
        try {
            
            const  { page, limit, ...filters } = req.query;

            const result = await paginationHelper.paginate( userModel, { 
                page, 
                limit, 
                filter: filters })

            return res.status(200).json({
                ok: true,
                message: "Usuarios obtenidos correctamente",
                result
            })

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                ok: false,
                message: "Error interno del servidor"
            });
        }
    },

    editUser: async ( req, res ) => {
        try {
            
            const { dni, email , ...rest } = req.body;

            /**
             * Verificar si ya existe el dni
             */
            if(dni){
                const existDni = await userModel.findOne({ dni, _id: { $ne: req.params.id } })
                if(existDni){
                    return res.status(409).json({
                        ok: false,
                        message: "El DNI ya esta registrado"
                    })
                }
            }

            if(email){
                const existEmail = await userModel.findOne({ email, _id: { $ne: req.params.id } })
                if(existEmail){
                    return res.status(409).json({
                        ok: false,
                        message: "El correo ya esta registrado"
                    })
                }
            }

            const user = await userModel.findByIdAndUpdate( 
                req.params.id, 
                rest, 
                { new: true } 
            )

            if(!user){
                return res.status(404).json({
                    ok: false,
                    message: "Usuario no encontrado"
                })
            }

            res.status(200).json({
                ok: true,
                message: "Usuario actualizado correctamente",
            })

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                ok: false,
                message: "Error interno del servidor"
            });
        }
    }
}

export default userController;