/*
    Campos:
        nombre
        correo
        telefono
        direccion
        puesto
        fecha_contratacion
        salario
        activo
*/

import { Schema, model } from "mongoose";

const empleadosScehmas = new Schema(
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

    puesto: {
      type: String,
      require: true,
    },

    fecha_contratacion: {
      type: Date,
      require: true,
    },

    salario: {
      type: Number,
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

export default model("empleados", empleadosScehmas); 