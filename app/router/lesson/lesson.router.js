import { Router } from "express";
import lessonController from "../../controller/lesson/lesson.controller.js";

const lessonRouter = Router();



lessonRouter.post("/lesson/create", lessonController.createLesson);

export default lessonRouter;
