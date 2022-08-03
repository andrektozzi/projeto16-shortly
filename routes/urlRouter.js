import { Router } from "express";

import { addUrl, getUrl } from "../controllers/urlController.js";
import { validateUrl } from "../middlewares/urlMiddleware.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";

const router = Router();

router.post("/urls/shorten", tokenMiddleware, validateUrl, addUrl);
router.get("/urls/:id", getUrl);

export default router;
