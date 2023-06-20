import { tokenVerificationErrors } from "../utils/tokenManager";

export const requreRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken
        if (!refreshTokenCookie) throw new Error("No existe el token ❌");

        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);

        req.uid = uid;
        next();
        
    } catch (error) {
        res.status(401).json({ error: tokenVerificationErrors[error.message] });
    }
}