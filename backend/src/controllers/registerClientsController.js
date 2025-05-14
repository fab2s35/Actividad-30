import jsonwebtoken from "jsonwebtoken"; 
import bcryptjs from "bcryptjs"; 
import nodemailer from "nodemailer"; 
import crypto from "crypto"; 

import clientsModel from "../models/clients.js";
import { config } from "../config.js";

const registerClientsController = {};

registerClientsController.register = async (req, res) => {
  // 1- Solicitar los datos que vamos a registrar
  const { name, email, password, telephone, address, active } = req.body;

  try {
    // Verificamos si el cliente ya existe
    const existingClient = await clientsModel.findOne({ email });
    if (existingClient) {
      return res.json({ message: "Client already exist" });
    }

    // Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    const newClient = new clientsModel({
      name,
      email,
      password: passwordHash,
      telephone,
      address,
      active,
    });

    await newClient.save();

    const verificationCode = crypto.randomBytes(3).toString("hex");

    // Generar un token que contenga el código de verificación
    const tokenCode = jsonwebtoken.sign(
      { email, verificationCode },
      config.JWT.secret,
      { expiresIn: "2h" }
    );

    res.cookie("verificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

    // Enviar el correo electrónico (usando async/await)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.email_user,
        pass: config.email.email_pass,
      },
    });

    const mailOptions = {
      from: config.email.email_user,
      to: email,
      subject: "Verificación de correo",
      text:
        "Para verificar tu cuenta, utiliza el siguiente código: " +
        verificationCode +
        "\n expira en dos horas",
    };

    // Esperamos a que se envíe el correo antes de enviar la respuesta
    await transporter.sendMail(mailOptions);

    // Enviar la respuesta solo después de enviar el correo
    res.json({
      message: "Client registered, Please verify your email with the code",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error registering client", error: error.message });
  }
};


registerClientsController.verifyCodeEmail = async (req, res) => {
  const { requireCode } = req.body;

  const token = req.cookies.verificationToken;

  try {
    // Verificar y decodificar el token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const { email, verificationCode: storedCode } = decoded;

    if (requireCode !== storedCode) {
      return res.json({ message: "Invalid code" });
    }

    const client = await clientsModel.findOne({ email });
    client.isVerified = true;
    await client.save();

    res.clearCookie("verificationToken");

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error verifying email", error: error.message });
  }
};

export default registerClientsController;
