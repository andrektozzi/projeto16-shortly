import { Router } from "express";
import tokenMiddleware from "../middlewares/tokenMiddleware.js";
import { getUser } from "../controllers/userController.js";

const router = Router();

router.get("/users/me", tokenMiddleware, getUser);

export default router;