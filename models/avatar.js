import mongoose, { Schema } from "mongoose";

const avatarSchema = new mongoose.Schema({
    avatar: {
        type: String,
        required: true,
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    user: {
        type: String,
        required: true
    }
},
{
    timestamps:true
}
);

export const Avatar = mongoose.model("Avatares", avatarSchema);