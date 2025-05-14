import express from "express";
import employeesController from "../controllers/employeesController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(employeesController.getEmployees)

router
  .route("/:id")
  .put(employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee);

export default router;
