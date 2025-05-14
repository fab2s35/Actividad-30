import EmployeeModel from "../models/employee.js";
import bcryptjs from "bcryptjs"; 
import jsonwebtoken from "jsonwebtoken"; 
import { config } from "../config.js";

const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) => {
  const {
   name, email, password, telephone, address, position, hire_date, salary, active
  } = req.body;

  try {
    //Verificamos si el empleado ya existe
    const existEmployee = await EmployeeModel.findOne({ email });
    if (existEmployee) {
      return res.json({ message: "Empleado ya existe" });
    }

    // Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    // Guardemos el empleado nuevo
    const newEmployee = new EmployeeModel({
      name, email, password: passwordHash, telephone, address, position, hire_date, salary, active
    });

    await newEmployee.save();

    //TOKEN 
    jsonwebtoken.sign(
      { id: newEmployee._id },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) console.log(error);
        res.cookie("authToken", token);
        res.json({message: "Empleado registrado"})
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export default registerEmployeesController;