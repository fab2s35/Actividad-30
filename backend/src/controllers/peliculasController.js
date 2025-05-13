const peliculasController = {};
import peliculasModel from "../models/peliculas.js"

//SELECT
peliculasController.getPeliculas= async (req, res) => {
    const peliculas = await peliculasModel.find();
    res.json(peliculas);
  };


//INSERT
peliculasController.createPeliculas= async (req, res) => {
    const { name, descripcion, director, genero, anio, imagen } = req.body;
    const newPeliculas = new peliculasModel({ name, descripcion, director, genero, anio, imagen });
    await newPeliculas.save();
    res.json({ message: "pelicula saved" });
  };


  //DELETE
  peliculasController.deletePeliculas = async (req, res) => {
    const deletedPeliculas = await peliculasModel.findByIdAndDelete(req.params.id);
      if (!deletedPeliculas) {
        return res.status(404).json({ message: "pelicula wasn't found" });
      }
      res.json({ message: "pelicula deleted" });
    };


    // UPDATE
peliculasController.updatePeliculas = async (req, res) => {
    // Solicito todos los valores
    const { name, descripcion, director, genero, anio, imagen  } = req.body;
    // Actualizo
    await peliculasModel.findByIdAndUpdate(
      req.params.id,
      {
          name, 
          descripcion, 
          director,
           genero, 
           anio, 
           imagen
      },
      { new: true }
    );
    // muestro un mensaje que todo se actualizo
    res.json({ message: "pelicula updated" });
  };

  export default peliculasController;
  
    