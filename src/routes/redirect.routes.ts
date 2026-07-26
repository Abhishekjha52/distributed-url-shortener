import { Router } from "express";
import { redirectToOriginalUrl } from "../controllers/url.controller";
const router = Router();

router.get("/:shortCode", redirectToOriginalUrl);

export default router;
