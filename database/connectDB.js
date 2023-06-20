import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI_MONGO);
    console.log("Conectado a la BD 🎉");    
} catch (error) {
    console.log(`Error al conectarse a la Base de datos: ${error} 😢`);
}