const empleadosController = {};
import empleadosModel from "../models/empleados.js"

//SELECT
empleadosController.getEmpleados= async (req, res) => {
    const empleados = await empleadosModel.find();
    res.json(empleados);
  };

  //INSERT
empleadosController.createEmpleados= async (req, res) => {
    const { name, correo, telefono, direccion, puesto, fecha_contratacion, salario, activo } = req.body;
    const newEmpleados = new empleadosModel({ name, correo, telefono, direccion, puesto, fecha_contratacion, salario, activo });
    await newEmpleados.save();
    res.json({ message: "empleado saved" });
  };


    //DELETE
    empleadosController.deletedEmpleados = async (req, res) => {
        const deletedEmpleados = await empleadosModel.findByIdAndDelete(req.params.id);
          if (!deletedEmpleados) {
            return res.status(404).json({ message: "empleado wasn't found" });
          }
          res.json({ message: "empleado deleted" });
        };


    // UPDATE
    empleadosController.updateEmpleado = async (req, res) => {
        // Solicito todos los valores
        const { name, correo, telefono, direccion, puesto, fecha_contratacion, salario, activo  } = req.body;
        // Actualizo
        await empleadosModel.findByIdAndUpdate(
          req.params.id,
          {
            name, correo, telefono, direccion, puesto, fecha_contratacion, salario, activo
          },
          { new: true }
        );
        // muestro un mensaje que todo se actualizo
        res.json({ message: "empleado updated" });
      };
    
      export default empleadosController;
      