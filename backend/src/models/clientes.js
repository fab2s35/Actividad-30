/*
    Campos:
        nombre
        correo
        telefono
        direccion
        activo
*/

import { Schema, model } from "mongoose";

const clientesSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    correo: {
      type: String,
      require: true,
    },

    telefono: {
      type: String,
      require: true,
    },

    direccion: {
      type: String,
      require: true,
    },

    activo: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("clientes", clientesSchema); 