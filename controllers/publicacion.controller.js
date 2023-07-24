import { Publicacion } from "../models/publicaciones.js";
import { User } from "../models/user.js";

export const getPublications = async (req, res) => {
    try {
        const publicaciones = await Publicacion.find();
        return res.json({ publicaciones });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error del servidor 💻" })
    }
};

export const getPublicacionById = async (req, res) => {
    try {
        const { id } = req.params
        const publicacion = await Publicacion.findById(id);

        if(!publicacion) return res.status(404).json({ error: "No existe el posteo 📄"});

        if(!publicacion.uid.equals(req.uid)) return res.status(401).json({ error: "Publicacion de otro usuario ❌"});
        return res.json({ publicacion });
    } catch (error) {
        console.log(error);
        if(error.kind === "ObjectId"){
            return res.status(403).json({ error: "Formato de id incorrecto 🆔" });
        }
        return res.status(500).json({ error: "error del servidor 💻" })
    }
};

export const createPublications = async (req, res) => {
    try {
        const id = req.uid;
        const userFind = await User.findById(id).lean();
        const user = userFind.nombre + " " + userFind.apellido;
        const { posteo } = req.body;
        const post = new Publicacion({ posteo, uid: req.uid, user });
        const newPost = await post.save();
        console.log(newPost);
        return res.status(201).json({ newPost });
    } catch (error) {
        return res.status(500).json({ error: "error del servidor 💻" })
    }
};

export const removePublicacionById = async (req, res) => {
    try {
        const { id } = req.params
        const publicacion = await Publicacion.findById(id);

        if(!publicacion) return res.status(404).json({ error: "No existe el posteo 📄"});

        if(!publicacion.uid.equals(req.uid)) return res.status(401).json({ error: "Publicacion de otro usuario ❌"});

        await publicacion.deleteOne();
        return res.json({ publicacion });
    } catch (error) {
        if(error.kind === "ObjectId"){
            return res.status(403).json({ error: "Formato de id incorrecto 🆔" });
        }
        return res.status(500).json({ error: "error del servidor 💻" })
    }
};

export const updatePublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { posteo } = req.body;

        const publicacion = await Publicacion.findById(id);

        if(!publicacion) return res.status(404).json({ error: "No existe el posteo 📄"});

        if(!publicacion.uid.equals(req.uid)) return res.status(401).json({ error: "Publicacion de otro usuario ❌"});

        publicacion.posteo = posteo;
        await publicacion.save();

        return res.json({ publicacion });
    } catch (error) {
        if(error.kind === "ObjectId"){
            return res.status(403).json({ error: "Formato de id incorrecto 🆔" });
        }
        return res.status(500).json({ error: "error del servidor 💻" })
    }
};