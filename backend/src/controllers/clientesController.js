const clientesController = {};
import clientesModel from "../models/clientes.js"

//SELECT
clientesController.getClientes= async (req, res) => {
    const clientes = await clientesModel.find();
    res.json(clientes);
  };

  //INSERT
clientesController.createClientes= async (req, res) => {
    const {  nombre, correo, telefono, direccion, activo } = req.body;
    const newClientes = new clientesModel({ nombre, correo, telefono, direccion, activo });
    await newClientes.save();
    res.json({ message: "cliente saved" });
  };


      //DELETE
      clientesController.deleteCliente = async (req, res) => {
        const deletedClientes = await clientesModel.findByIdAndDelete(req.params.id);
          if (!deletedClientes) {
            return res.status(404).json({ message: "clientes wasn't found" });
          }
          res.json({ message: "clientes deleted" });
        };


    // UPDATE
    clientesController.updateClientes = async (req, res) => {
        // Solicito todos los valores
        const { nombre, correo, telefono, direccion, activo  } = req.body;
        // Actualizo
        await clientesModel.findByIdAndUpdate(
          req.params.id,
          {
            nombre, correo, telefono, direccion, activo
          },
          { new: true }
        );
        // muestro un mensaje que todo se actualizo
        res.json({ message: "cliente updated" });
      };
    
      export default clientesController;