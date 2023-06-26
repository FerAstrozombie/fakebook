import { Router } from "express";
import { createPublications, getPublications } from "../controllers/publicacion.controller.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router.get("/", requireToken, getPublications);

router.post("/", requireToken,createPublications );
export default router;