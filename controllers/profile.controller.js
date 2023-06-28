import { User } from "../models/user.js";

export const getProfile = async (req, res) => {
    try {
        const id = req.uid;
        const user = await User.findById(id).lean();
        res.json({email: user.email, uid: user._id});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error del servidor 💻" });
    }
}

export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        if(!user) return res.status(404).json({ error: "No existe el usuario 👦"});

        await user.deleteOne();
        return res.json({ user });
    } catch (error) {
        if(error.kind === "ObjectId"){
            return res.status(403).json({ error: "Formato de id incorrecto 🆔" });
        }
        return res.status(500).json({ error: "error del servidor 💻" })
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = req.body;

        const user = await User.findById(id);

        if(!user) return res.status(404).json({ error: "No existe el usuario 👦"});

        user.email = usuario.email;
        await user.save();

        return res.json({ user });
    } catch (error) {
        if(error.kind === "ObjectId"){
            return res.status(403).json({ error: "Formato de id incorrecto 🆔" });
        }
        return res.status(500).json({ error: "error del servidor 💻" })
    }
};