import userModel from '../../models/user/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authController = {
    generarToken : (userId, dni, rol) => {
        return jwt.sign({ id : userId, dni : dni , rol : rol}, process.env.JWT_SECRET, { expiresIn: '3h'})
    },

    auth : async ( req, res ) => {
        try {
            const { email, password } = req.body;

            const user = await userModel.findOne({ email })

            if(!user){
                return res.status(404).json({ message : "Email incorrecto, porfavor revise y vuelva a ingresar"})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({ message : "Contraseña incorrecta"})
            }

            console.log("dni", user.dni)

            const token = authController.generarToken(user._id, user.dni, user.rol);

            res.status(200).json({
                message: "Autenticación exitosa",
                token : token
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message : "Error en la autenticación", error })
        }
    }
}

export default authController;