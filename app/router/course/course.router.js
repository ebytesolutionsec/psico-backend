import { Router } from "express";
import courseController from "../../controller/course/course.controller.js";

const routerCourse = Router()

/**
 * @swagger
 * /course/create:
 *   post:
 *     summary: Create a new course
 *     tags:
 *       - Courses
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
 *               imagen:
 *                  type: string
 *               precio:
 *                  type: number
 *               nivel:
 *                  type: string
 *                  enum: [principiante, intermedio, experto]
 *               idioma:
 *                  type: string
 *                  default: "es"
 *               durationHours:
 *                  type: number
 *               instructorId:
 *                  type: string
 *               categorId:
 *                  type: string
 *               objetives:
 *                  type: array
 *               tags:
 *                  type: array
 *               status:
 *                  type: string
 *                  enum: [publish , review, archivado, borrador]
 *               cantStudents:
 *                  type: number
 *               dateCreation:
 *                  type: string
 *                  format: date-time
 *               dateUpdate:
 *                  type: string
 *                  format: date-time
 *             required:
 *               - title
 *               - description
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Invalid request
 */
routerCourse.post('/course/create', courseController.createCourse)

/**
 * @swagger
 * /course/list:
 *   get:
 *     summary: Listar cursos con paginación
 *     description: Obtiene un listado paginado de cursos registrados en el sistema.
 *     tags: [Courses]
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
 *         description: Lista de cursos obtenida correctamente
 *         content:
 *           application/json:
 *       400:
 *         description: Parámetros de paginación inválidos
 *       500:
 *         description: Error interno del servidor
 */
routerCourse.get('/course/list', courseController.listAllCourses)

export default routerCourse;