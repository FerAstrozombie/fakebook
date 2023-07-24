import { Router } from "express";
import { infoUser, login, logout, refreshToken, register } from "../controllers/auth.controller.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validator.Manager.js";
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";

const router = Router();

router.post("/login", bodyLoginValidator,login);

router.post("/register", bodyRegisterValidator, register);

router.get("logout", logout);

router.get("/protected",requireToken, infoUser);

router.get("/profile", requireToken, infoUser);

router.get("/refresh", requireRefreshToken, refreshToken);

router.get("/logout", logout);

export default router;