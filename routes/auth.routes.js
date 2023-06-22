import { Router } from "express";
import { infoUser, login, logout, register } from "../controllers/auth.controller.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validator.Manager.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router.post("/login", bodyLoginValidator,login);

router.post("/register", bodyRegisterValidator, register);

router.get("logout", logout);

router.get("/protected",requireToken, infoUser);

export default router;