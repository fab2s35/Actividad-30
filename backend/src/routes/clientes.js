import express from "express";
import clientesController from "../controllers/clientesController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(clientesController.getClientes)
  .post(clientesController.createClientes);

router
  .route("/:id")
  .put(clientesController.updateClientes)
  .delete(clientesController.deleteCliente);

export default router;
