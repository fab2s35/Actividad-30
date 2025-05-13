const clientsController = {};
import clientsModel from "../models/clients.js";

//SELECT
clientsController.getClients = async (req, res) => {
  const clients = await clientsModel.find();
  res.json(clients);
};

//INSERT
clientsController.createClients = async (req, res) => {
  const { name, email, phone, address, active } = req.body;
  const newClient = new clientsModel({ name, email, phone, address, active });
  await newClient.save();
  res.json({ message: "client saved" });
};

//DELETE
clientsController.deleteClient = async (req, res) => {
  const deletedClient = await clientsModel.findByIdAndDelete(req.params.id);
  if (!deletedClient) {
    return res.status(404).json({ message: "client wasn't found" });
  }
  res.json({ message: "client deleted" });
};

//UPDATE
clientsController.updateClient = async (req, res) => {
  // Solicito todos los valores
  const { name, email, phone, address, active } = req.body;
  // Actualizo
  await clientsModel.findByIdAndUpdate(
    req.params.id,
    {
      name, email, phone, address, active
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "client updated" });
};

export default clientsController;
