import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validator.Manager.js";

const router = Router();

router.post("/login", bodyLoginValidator,login);

router.post("/register", bodyRegisterValidator, register);

router.get("logout", logout);

export default router;