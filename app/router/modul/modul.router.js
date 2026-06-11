import { Router } from "express"
import moduleCourseController from "../../controller/modul/modul.controller.js"

const moduleCourseRouter = Router()

/**
 * @swagger
 * /module/create:
 *   post:
 *     summary: Create a new module for a course
 *     tags:
 *       - Modules
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                  type: string
 *               orden:
 *                  type: number
 *               cursoId:
 *                  type: string
 *     responses:
 *       201:
 *         description: Module created successfully
 *       400:
 *         description: Invalid request
 */
moduleCourseRouter.post("/module/create", moduleCourseController.createModuleCourse)

export default moduleCourseRouter;