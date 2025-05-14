import express from "express";
import multer from "multer";
import moviesController from "../controllers/moviesController.js";

const router = express.Router();

//Configurar una carpeta en local que guarde las imagenes
const upload = multer({ dest: "public/" });

router
  .route("/")
  .get(moviesController.getAllMovies)
  .post(upload.single("image"), moviesController.createFilm);

export default router;