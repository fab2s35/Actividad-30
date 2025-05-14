// Importo todo lo de la libreria de Express
import express from "express";
import cookieParser from "cookie-parser";

import moviessRoute from "./src/routes/movies.js";
import employeesRoute from "./src/routes/employees.js"; 
import clientsRoute from "./src/routes/clients.js"
import registerClients from "./src/routes/registerClient.js";
import registerEmployeesRoutes from "./src/routes/registerEmployee.js"
import loginRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js";
import passwordRecoveryRoutes from "./src/routes/passwordRecovery.js";

// Creo una constante que es igual a la libreria que importé
const app = express();
//Que acepte datos en json
app.use(express.json());
//Que acepte cookies en postman
app.use(cookieParser());
// Definir las rutas de las funciones que tendrá la página web

app.use("/api/movies", moviessRoute);
app.use("/api/employees", employeesRoute);
app.use("/api/clients", clientsRoute);
app.use("/api/registerClients", registerClients);
app.use("/api/registerEmployees", registerEmployeesRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/passwordRecovery", passwordRecoveryRoutes);

// Exporto la constante para poder usar express en otros archivos
export default app;
