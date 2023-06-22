import { Router } from "express";
import { getProfile } from "../controllers/profile.controller.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router.get("/profile", requireToken, getProfile);

export default router;