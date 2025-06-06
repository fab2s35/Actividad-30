const employeesController = {};
import employeesModel from "../models/employees.js";

//SELECT
employeesController.getEmployees = async (req, res) => {
  const employees = await employeesModel.find();
  res.json(employees);
};

//DELETE
employeesController.deleteEmployee = async (req, res) => {
  const deletedEmployee = await employeesModel.findByIdAndDelete(req.params.id);
  if (!deletedEmployee) {
    return res.status(404).json({ message: "employee wasn't found" });
  }
  res.json({ message: "employee deleted" });
};

//UPDATE
employeesController.updateEmployee = async (req, res) => {
  // Solicito todos los valores
  const { name, email, telephone, address, position, hire_date, salary, active } = req.body;
  // Actualizo
  await employeesModel.findByIdAndUpdate(
    req.params.id,
    {
      name, email, telephone, address, position, hire_date, salary, active
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "employee updated" });
};

export default employeesController;
