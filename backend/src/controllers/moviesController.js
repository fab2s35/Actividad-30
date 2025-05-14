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
  const posts = await moviesModel.find();
  res.json(posts);
};

moviesController.createMovie = async (req, res) => {
  try {
    const { name, description, director, genre, year, duration } = req.body;
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        req.file.path, 
        {

        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"],

      }
    );
      imageUrl = result.secure_url
    }
    const newFilm = new moviesModel({  name, description, director, genre, year, duration, image: imageUrl });
    newMovie.save();

    res.json({ message: "movie saved" });

  } catch (error) {

    console.log("error" + error);
    
  }

};

export default moviesController;
    