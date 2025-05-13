/*
    Campos:
        titulo
        descripcion
        director
        genero
        anio
        duracion
        imagen
*/

import { Schema, model } from "mongoose";

const peliculasSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    descripcion: {
      type: String,
      require: true,
    },

    director: {
      type: String,
      require: true,
    },

    genero: {
      type: String,
      require: true,
    },

    anio: {
      type: Number,
      require: true,
    },

    imagen: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("peliculas", peliculasSchema);
