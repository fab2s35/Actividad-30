import nodemailer from "nodemailer"; 
import { config } from "../config.js";

// 1- Configurar el transporter => ¿Quien lo envia?
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.email.email_user,
    pass: config.email.email_pass,
  },
});

//2-Enviar el correo
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Cinemark" <fabiolaretana22@gmail.com>',
      to,
      subject,
      text,
      html,
    });

    return info;
  } catch (error) {
    console.log("Error sending email" + error);
  }
};

// 3- Funcion para generar el HTML
const HTMLRecoveryEmail = (code) => {
  return `
    <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafc; padding: 40px 20px;">
      <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
        <tr>
          <td style="padding: 30px; text-align: center;">
            <h2 style="color: #2c3e50; font-size: 24px; margin-bottom: 20px;">🔐 Password Recovery</h2>
            <p style="font-size: 16px; color: #333333; margin-bottom: 30px;">
              We received a request to reset your password. Please use the verification code below:
            </p>
            <div style="display: inline-block; padding: 15px 30px; font-size: 22px; font-weight: bold; color: #ffffff; background-color: #e67e22; border-radius: 6px; letter-spacing: 2px;">
              ${code}
            </div>
            <p style="font-size: 14px; color: #555555; margin-top: 30px;">
              This code is valid for the next <strong>15 minutes</strong>.<br>
              If you did not request this, please ignore this email.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #f1f1f1;">
            <p style="font-size: 12px; color: #999999;">
              Need help? Contact our support team: 
              <a href="mailto:support@example.com" style="color: #3498db; text-decoration: none;">support@example.com</a>
            </p>
          </td>
        </tr>
      </table>
    </div>
  `;
};


export { sendEmail, HTMLRecoveryEmail };
