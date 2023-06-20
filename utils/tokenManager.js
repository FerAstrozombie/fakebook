import jwt from "jsonwebtoken";

export const generadorToken = (uid) => {

    const expiresIn = 60 * 15

    try {
        const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
        return { token, expiresIn }
    } catch (error) {
        console.log(error);
    }
}

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30;
    try {
        const refresToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {expiresIn});
        res.cookie("refresToken", refresToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn * 1000)
        });
    } catch (error) {
        console.log(error);
    }
};

export const tokenVerificationErrors = {
    "invalid signature": "La firma del JWT no es valida ✏",
    "jwt expired": "JWT expirado 🧨",
    "invalid token": "Token no valido ❌",
    "No Bearer": "Utiliza formato Bearer 🐻",
    "jwt malformed": "JWT formato no valido ❌"
};