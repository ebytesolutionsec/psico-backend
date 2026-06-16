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

/**
 * @swagger
 * /usuario/getAll:
 *   get:
 *     summary: Listar usuarios con paginación
 *     description: Obtiene un listado paginado de usuarios registrados en el sistema.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de registros por página
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *       400:
 *         description: Parámetros de paginación inválidos
 *       500:
 *         description: Error interno del servidor
 */
routerUser.get('/usuario/getAll', userController.listAllUsers)

/**
 * @swagger
 * /usuario/edit/{id}:
 *   patch:
 *     summary: Actualizar información de un usuario
 *     description: Actualiza parcialmente los datos de un usuario existente.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             fullName: "Elvis Burgos Actualizado"
 *             direccion: "Nueva dirección, Loja"
 *             phone: "0988888888"
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
routerUser.patch('/usuario/edit/:id', userController.editUser)
export default routerUser;