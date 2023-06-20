import { User } from "../models/user.js";
import { generadorToken, generateRefreshToken, tokenVerificationErrors } from "../utils/tokenManager.js";

export const login = async (req, res) => {
    const  { email, password } = req.body;
    try {
        //Valido el usuario
        let user = await User.findOne({ email });
        if(!user) return res.status(403).json({ error: "No existe el usuario 🔍"});
        const respuestaPassword = await user.comparePassword(password);
        if (!respuestaPassword) return res.status(403).json({ error: "Contraseña incorrecta ❌"});

        //Genero el JWT
        const { token, expiresIn } = generadorToken(user._id);
        generateRefreshToken(user._id, res)
        res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor 💻"});
    }
};

export const register = async (req, res) => {
    const  { nombre, apellido, telefono, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) throw({ code: 11000 });
        user = new User({ nombre, apellido, telefono, email, password });
        await user.save();
        return res.status(201).json({ ok: true });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Ya existe el usuario 😐" });
        }
        return res.status(500).json({ error: "Error de servidor 💻"});
    }
};

export const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generadorToken(req.uid);
        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error del servidor 💻"});
    }

};

export const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ ok: true });
}