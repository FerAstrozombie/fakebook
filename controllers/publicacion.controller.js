import { isValidObjectId } from "mongoose";
import { Publicacion } from "../models/publicaciones.js";

export const getPublications = async (req, res) => {
    try {
        const publicaciones = await Publicacion.find({ uid: req.uid });
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
        const { posteo } = req.body;

        const post = new Publicacion({ posteo, uid: req.uid });
        const newPost = await post.save();
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

        publicacion.deleteOne();
        return res.json({ publicacion });
    } catch (error) {
        if(error.kind === "ObjectId"){
            return res.status(403).json({ error: "Formato de id incorrecto 🆔" });
        }
        return res.status(500).json({ error: "error del servidor 💻" })
    }
}