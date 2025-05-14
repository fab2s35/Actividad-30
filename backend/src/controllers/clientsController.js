const clientsController = {};
import clientsModel from "../models/clients.js";

//SELECT
clientsController.getClients = async (req, res) => {
  const clients = await clientsModel.find();
  res.json(clients);
};


//DELETE
clientsController.deleteClients = async (req, res) => {
  const deletedClient = await clientsModel.findByIdAndDelete(req.params.id);
  if (!deletedClient) {
    return res.status(404).json({ message: "client wasn't found" });
  }
  res.json({ message: "client deleted" });
};

//UPDATE
clientsController.updateClients = async (req, res) => {
  // Solicito todos los valores
  const { name, email, telephone, address, active } = req.body;
  // Actualizo
  await clientsModel.findByIdAndUpdate(
    req.params.id,
    {
      name, email, telephone, address, active
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "client updated" });
};

export default clientsController;
