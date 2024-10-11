import { Router } from "express";
import { createUserSchema, loginUserSchema, requestResetEmailSchema, resetPasswordSchema } from "../validation/auth.js";
import { loginUserController, logOutUserController, refreshUserSessionController, registerUserController, requestResetEmailController, resetPasswordController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router=Router();

router.post('/register', validateBody(createUserSchema), ctrlWrapper(registerUserController));
router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));
router.post('/logout', ctrlWrapper(logOutUserController));
router.post('/refresh', ctrlWrapper(refreshUserSessionController));
router.post('/send-reset-email',validateBody(requestResetEmailSchema),  ctrlWrapper(requestResetEmailController));
router.post('/reset-password', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));
export default router;
