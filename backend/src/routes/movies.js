import express from "express";
import multer from "multer";
import moviesController from "../controllers/moviesController.js"

const router = express.Router()

//Configurara una carpeta que guarde las imagenes
const upload = multer({dest: "public/"})

router.route("/")
.get(moviesController.getAllMovies)
.post(upload.single("image"), moviesController.createMovie);

export default router