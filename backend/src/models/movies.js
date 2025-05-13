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

const moviesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    director: {
      type: String,
      required: true,
    },

    genre: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("movies", moviesSchema);
