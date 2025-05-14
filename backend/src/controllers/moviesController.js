import moviesModel from "../models/movies.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

const moviesController = {};

moviesController.getAllMovies = async (req, res) => {
  try {
    const movies = await moviesModel.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las películas" });
  }
};

moviesController.createMovie = async (req, res) => {
  try {
    const { name, description, director, genre, year, duration } = req.body;
    let imageUrl = "";

    // Si hay un archivo, sube la imagen a Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageUrl = result.secure_url; // Obtén la URL segura de la imagen subida
    }

    // Crear la nueva película
    const newMovie = new moviesModel({
      name,
      description,
      director,
      genre,
      year,
      duration,
      image: imageUrl,
    });

    // Guardar la película en la base de datos
    await newMovie.save();

    // Responder con un mensaje de éxito
    res.json({ message: "Película guardada exitosamente" });

  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Hubo un error al guardar la película." });
  }
};

export default moviesController;
