import { Router } from "express";

import { addUrl } from "../controllers/urlController.js";
import { validateUrl } from "../middlewares/urlMiddleware.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";

const router = Router();

router.post("/urls/shorten", tokenMiddleware, validateUrl, addUrl);

export default router;
