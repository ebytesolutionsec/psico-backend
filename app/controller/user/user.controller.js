
import userModel from "../../models/user/user.model.js";
import bcrypt from 'bcrypt';

const userController = {
    
    createUser : async ( req, res) =>{
        try {
            
            const {
                fullName,
                email,
                password,
                rol,
                biografia
            } = req.body;

            if (!fullName || !email || !password) {
                return res.status(400).json({
                    ok: false,
                    message: "fullName, email y password son obligatorios"
                });
            }

            //Verify exist user
            const userExist = await userModel.findOne({ email })

            if(userExist){
                return res.status(409).json({
                    ok: false,
                    message : "El correo ya esta registrado"
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
    }
}

export default userController;