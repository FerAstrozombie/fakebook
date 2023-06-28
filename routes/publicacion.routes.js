import { Router } from "express";
import { createPublications, getPublicacionById, getPublications, removePublicacionById, updatePublicacion } from "../controllers/publicacion.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { paramIdValidator } from "../middlewares/validator.Manager.js";

const router = Router();

router.get("/", requireToken, getPublications);

router.get("/:id", requireToken, getPublicacionById);

router.post("/", requireToken,createPublications);

router.delete("/:id", requireToken, paramIdValidator, removePublicacionById);

router.patch("/:id", requireToken, paramIdValidator, updatePublicacion);

export default router;