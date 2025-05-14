import clientsModel from "../models/clients.js";
import employeesModel from "../models/employees.js";
import bcryptjs from "bcryptjs"; 
import jsonwebtoken from "jsonwebtoken"; 
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let userFound; 
    let userType; 

    if (
      email === config.emailAdmin.email &&
      password === config.emailAdmin.password
    ) {
      (userType = "admin"), (userFound = { _id: "admin" });
    } else {

      userFound = await employeesModel.findOne({ email });
      userType = "employee";

      if (!userFound) {
        userFound = await clientsModel.findOne({ email });
        userType = "client";
      }
    }

    if (!userFound) {
      return res.json({ message: "User not found" });
    }

    // Validar la contraseña
    if (userType !== "admin") {
      const isMatch = await bcryptjs.compare(password, userFound.password);
      if (!isMatch) {
        console.log("no matchea");
        return res.json({ message: "Contraseña invalida" });
      }
    }

    // TOKEN 
    jsonwebtoken.sign(
      //1-Que voy a guardar
      { id: userFound._id, userType },
      //2-Secreto
      config.JWT.secret,
      //3- cuando expira
      { expiresIn: config.JWT.expiresIn },
      //4-funcion flecha
      (error, token) => {
        if (error) console.log(error);

        res.cookie("authToken", token);
        res.json({ message: "login successful" });
      }
    );
  } catch (error) {
    res.json({ message: "error" });
  }
};

export default loginController;