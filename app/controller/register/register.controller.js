
import registerModule from "../../models/register/register.models";

const registerController = {

    createRegister : async (req, res) => {
        try {
            const { usuarioId, courseId, status } = req.body;
            const newRegister = new registerModule({ usuarioId, courseId, status });
            await newRegister.save();
            res.status(201).json(newRegister);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el registro', error });
        }
    }
}


export default registerController;