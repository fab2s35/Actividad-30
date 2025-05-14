import express from "express";
import clientsController from "../controllers/clientsController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(clientsController.getClients)

router
  .route("/:id")
  .put(clientsController.updateClients)
  .delete(clientsController.deleteClients);

export default router;
