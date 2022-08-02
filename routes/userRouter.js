import { Router } from "express";
import { validateSignUp } from "../middlewares/userMiddleware.js";
import { signUp } from "../controllers/userController.js"

const router = Router();

router.post("/signup", validateSignUp, signUp);

export default router;