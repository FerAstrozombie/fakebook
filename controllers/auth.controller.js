import { User } from "../models/user.js";
import { generadorToken, generateRefreshToken } from "../utils/tokenManager.js";

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
        generateRefreshToken(user._id, res);
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
        /* let urlImg = `http://localhost:8080/public/uploads/${req.file.originalname}`;
        avatar = urlImg */
        user = new User({nombre, apellido, telefono, email, password });
        await user.save();

        //Genero el JWT
        const { token, expiresIn } = generadorToken(user._id);
        generateRefreshToken(user._id, res);
        
        return res.status(201).json({ token, expiresIn });
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
    res.status(200).json({ mensaje: "Cookie eliminada con exito"});
};

export const infoUser = async (req, res) => {
    try {
        const id = req.uid
        const user = await User.findById(id).lean();
        const userFind = {
            nombre: user.nombre,
            apellido: user.apellido,
            telefono: user.telefono,
            email: user.email,
        }
        res.json({ user: userFind })
    } catch (error) {
        return res.status(500).json({error: "error del servidor ❌"})
    }
}