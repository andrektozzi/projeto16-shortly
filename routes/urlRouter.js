import { Router } from "express";

import { addUrl, getUrl, openUrl, deleteUrl } from "../controllers/urlController.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { middleware } from "../middlewares/schemasMiddleware.js";
import { schemas } from "../schemas/schemas.js";

const router = Router();

router.post("/urls/shorten", tokenMiddleware, middleware(schemas.urlSchema), addUrl);
router.get("/urls/:id", getUrl);
router.get("/urls/open/:shortUrl", openUrl);
router.delete("/urls/:id", tokenMiddleware, deleteUrl);

export default router;
