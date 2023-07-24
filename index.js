import express from "express";
import "dotenv/config";
import "./database/connectDB.js";
import authRouter from "./routes/auth.routes.js";
import profileRouter from "./routes/profile.routes.js";
import publicacionRouter from "./routes/publicacion.routes.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";

const app = express();

const whiteList = [ process.env.ORIGIN1]
app.use(cors({
    origin: function (origin, callback) {
        console.log("😯😯😯 =>", origin);
        if(!origin || whiteList.includes(origin)){
            return callback(null, origin);
        }
        return callback(
            "Error de CORS oridgin" + origin + " No autorizado!"
        )
    },
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/", profileRouter);
app.use("/publicaciones", publicacionRouter);
app.use(express.static("public"));

/* establecemos la configuracion del almacenamiento de las imagenes */
const storage = multer.diskStorage({
    destination: "public/uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
app.use(multer({
    storage: storage,
    dest: "/public/uploads"
}).single("avatar"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT} ✨✨✨`));