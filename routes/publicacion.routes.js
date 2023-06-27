import { Router } from "express";
import { createPublications, getPublicacionById, getPublications, removePublicacionById } from "../controllers/publicacion.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { paramIdValidator } from "../middlewares/validator.Manager.js";

const router = Router();

router.get("/", requireToken, getPublications);

router.get("/:id", requireToken, getPublicacionById);

router.post("/", requireToken,createPublications);

router.delete("/:id", requireToken, paramIdValidator, removePublicacionById);

export default router;