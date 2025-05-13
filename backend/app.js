// Importo todo lo de la libreria de Express
import express from "express";
import cookieParser from "cookie-parser";

import peliculasRoute from "./src/routes/peliculas.js";


// Creo una constante que es igual a la libreria que importé
const app = express();
//Que acepte datos en json
app.use(express.json());
//Que acepte cookies en postman
app.use(cookieParser());
// Definir las rutas de las funciones que tendrá la página web

app.use("/api/peliculas", peliculasRoute);


// Exporto la constante para poder usar express en otros archivos
export default app;
