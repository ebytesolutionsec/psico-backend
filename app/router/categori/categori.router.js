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

export default routerCategori