import { Router } from "express";
import lessonController from "../../controller/lesson/lesson.controller.js";

const lessonRouter = Router();


/**
 * @swagger
 * /lesson/create:
 *   post:
 *     summary: Create a new lesson
 *     tags:
 *       - Lessons
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                  type: string
 *               description:
 *                  type: string
 *               courseId:
 *                  type: string
 *               moduleId:  
 *                  type: string
 *               type:
 *                  type: string
 *               duracion:
 *                  type: number
 *               orden:
 *                  type: number
 *               content:
 *                  type: object
 *                  properties:
 *                      videoUrl:
 *                          type: string
 *                      texto:
 *                          type: string
 *                      pdfUrl:
 *                         type: string
 *                      quiz:
 *                          type: object
 *                          properties:
 *                             questions:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          question:
 *                                              type: string
 *                                          options:
 *                                               type: array
 *                                               items:
 *                                                  type: string
 *                                          correctAnswer:
 *                                              type: string
 *     responses:
 *       201:
 *         description: Lesson created successfully
 *       400:
 *         description: Invalid request
 */
lessonRouter.post("/lesson/create", lessonController.createLesson);

/**
 * @swagger
 * /lesson/getAll:
 *   get:
 *     summary: Listar lecciones con paginación
 *     description: Obtiene un listado paginado de lecciones registradas en el sistema.
 *     tags: [Lessons]
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
 *         description: Lista de lecciones obtenida correctamente
 *         content:
 *           application/json:
 *       400:
 *         description: Parámetros de paginación inválidos
 *       500:
 *         description: Error interno del servidor
 */
lessonRouter.get("/lesson/getAll", lessonController.listAllLessons);

export default lessonRouter;
