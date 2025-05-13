const moviesController = {};
import moviesModel from "../models/movies.js";

//SELECT
moviesController.getMovies = async (req, res) => {
  const movies = await moviesModel.find();
  res.json(movies);
};

//INSERT
moviesController.createMovies = async (req, res) => {
  const { name, description, director, genre, year, image } = req.body;
  const newMovie = new moviesModel({ name, description, director, genre, year, image });
  await newMovie.save();
  res.json({ message: "movie saved" });
};

//DELETE
moviesController.deleteMovie = async (req, res) => {
  const deletedMovie = await moviesModel.findByIdAndDelete(req.params.id);
  if (!deletedMovie) {
    return res.status(404).json({ message: "movie wasn't found" });
  }
  res.json({ message: "movie deleted" });
};

//UPDATE
moviesController.updateMovie = async (req, res) => {
  const { name, description, director, genre, year, image } = req.body;
  await moviesModel.findByIdAndUpdate(
    req.params.id,
    {
      name, 
      description, 
      director,
      genre, 
      year, 
      image
    },
    { new: true }
  );
  res.json({ message: "movie updated" });
};

export default moviesController;

    