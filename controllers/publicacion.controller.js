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

export const createPublications = async (req, res) => {
    try {
        const { posteo } = req.body;

        const post = new Publicacion({ posteo, uid: req.uid });
        const newPost = await post.save();
        return res.status(201).json({ newPost });
    } catch (error) {
        return res.status(500).json({ error: "error del servidor 💻" })
    }
}