import { Router } from "express";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { getUser, getRanking } from "../controllers/userController.js";

const router = Router();

router.get("/users/me", tokenMiddleware, getUser);
router.get("/ranking", getRanking);

export default router;