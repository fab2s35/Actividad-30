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

const employeesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      required: true,
    },

    hire_date: {
      type: Date,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    active: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("employees", employeesSchema);
