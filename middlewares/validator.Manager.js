import { validationResult, body } from "express-validator";

export const validatorExpress = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    next();
};

export const bodyRegisterValidator = [

    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Minimo 6 caracteres")
        .trim()
        .isLength({ min: 6 }),
    body("password", "Formato de password incorrecto")
        .custom((value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error("No coinciden las contraseñas")
            }
            return value;
    }),
    validatorExpress

]

export const bodyLoginValidator = [

    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Minimo 6 caracteres")
        .trim()
        .isLength({ min: 6 }),
    validatorExpress

]