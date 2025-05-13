import express from "express";
import moviesController from "../controllers/moviesController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(moviesController.getMovies)
  .post(moviesController.createMovies);

router
  .route("/:id")
  .put(moviesController.updateMovie)
  .delete(moviesController.deleteMovie);

export default router;
