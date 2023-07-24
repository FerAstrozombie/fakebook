import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    nombre:{
        type: String,
        trim: true,
        required: true,
    },
    apellido:{
        type: String,
        trim: true,
        required: true,
    },
    telefono:{
        type: Number,
        trim: true,
        required: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: { unique: true },
    },
    password:{
        type: String,
        required: true,
    },
},
{
    timestamps:true
}
);

userSchema.pre("save", async function(next) {
    const user = this;

    if (!user.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Error al codificar la contraseña");
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

export const User = mongoose.model("User", userSchema);