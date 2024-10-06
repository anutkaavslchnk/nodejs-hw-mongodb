import { Router } from "express";
import { createUserSchema, loginUserSchema } from "../validation/auth.js";
import { loginUserController, logOutUserController, refreshUserSessionController, registerUserController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router=Router();

router.post('/register', validateBody(createUserSchema), ctrlWrapper(registerUserController));
router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));
router.post('/logout', ctrlWrapper(logOutUserController));
router.post('/refresh', ctrlWrapper(refreshUserSessionController));
export default router;
