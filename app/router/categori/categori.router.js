import { Router } from "express";
import categoriController from "../../controller/categori/categori.controller.js";

const routerCategori = Router()

/**
 * @swagger
 * /categori/create:
 *   post:
 *     summary: Crear un nueva categoria
 *     tags: [Categori]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Usuario de Prueba"
 *             description: "test@email.com"
 *             status: true
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos inválidos o usuario ya existente
 *       500:
 *         description: Error interno del servidor
 */
routerCategori.post('/categori/create', categoriController.createCategori)


/**
 * @swagger
 * /categori/list:
 *   get:
 *     summary: Listar todas las categorias con paginación
 *     description: Obtiene un listado paginado de categorias registradas en el sistema.
 *     tags: [Categori]
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
 *         description: Lista de categorias obtenida correctamente
 *         content:
 *           application/json:
 *       400:
 *         description: Parámetros de paginación inválidos
 *       500:
 *         description: Error interno del servidor
 */
routerCategori.get('/categori/list', categoriController.listAllCategories)

/**
 * @swagger
 * /categori/edit/{id}:
 *   patch:
 *     summary: Actualizar información de una categoria
 *     description: Actualiza parcialmente los datos de una categoria existente.
 *     tags: [Categori]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoria a editar
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
routerCategori.patch('/categori/edit/:id', categoriController.editCategori)

export default routerCategori