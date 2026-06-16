import { Router } from "express";
import registerController from "../../controller/register/register.controller";

const registerRouter = Router();

registerRouter.post('/register/create', registerController.createRegister);

export default registerRouter;