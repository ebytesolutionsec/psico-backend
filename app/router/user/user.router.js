import { Router } from "express";
import userController from "../../controller/user/user.controller.js";

const routerUser = Router();

/**
 * @swagger
 * /usuario/create:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: |
 *       Crea un nuevo usuario en el sistema.
 *       El correo electrónico y el DNI deben ser únicos.
 *       La contraseña se almacena de forma segura (hasheada).
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             fullName: "Usuario de Prueba"
 *             email: "test@email.com"
 *             password: "12345678"
 *             photoPerfil : "url foto"
 *             rol : "admin,teacher,student"
 *             biografi : "Si es teacher ingresar biografia"
 *             status : "default true"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos inválidos o usuario ya existente
 *       500:
 *         description: Error interno del servidor
 */
routerUser.post('/usuario/create', userController.createUser)

export default routerUser;