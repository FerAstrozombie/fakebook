import { Router } from "express";
import { eliminarUsuario, getProfile, updateUser } from "../controllers/profile.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { paramIdValidator } from "../middlewares/validator.Manager.js";

const router = Router();

router.get("/profile", requireToken, getProfile);

router.delete("/:id", requireToken, paramIdValidator, eliminarUsuario);

router.patch("/:id", requireToken, paramIdValidator, updateUser);

export default router;