import mongoose, { Schema } from "mongoose";

const publicacionesSchema = new mongoose.Schema({
    posteo: {
        type: String,
        required: true,
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps:true
}
);

export const Publicacion = mongoose.model("Publicaciones", publicacionesSchema);