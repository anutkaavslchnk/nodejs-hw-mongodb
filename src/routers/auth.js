import { Router } from "express";
import { createUserSchema, loginUserSchema,  requestResetEmailSchema, resetPasswordSchema } from "../validation/auth.js";
import { loginUserController, logOutUserController, refreshUserSessionController, registerUserController, requestResetEmailController, resetPasswordController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router=Router();
// router.get('/get-oauth-url', ctrlWrapper(getGoogleAuthUrlController));
// router.post('/confirm-oauth',validateBody(loginWithGoogleOAuthSchema) , ctrlWrapper(loginWithGoogleController))
router.post('/register', validateBody(createUserSchema), ctrlWrapper(registerUserController));
router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));
router.post('/logout', ctrlWrapper(logOutUserController));
router.post('/refresh', ctrlWrapper(refreshUserSessionController));
router.post('/send-reset-email',validateBody(requestResetEmailSchema),  ctrlWrapper(requestResetEmailController));
router.post('/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));
export default router;
