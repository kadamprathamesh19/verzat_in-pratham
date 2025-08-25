import Service from "../models/Service.js"; // Note the .js extension is required in ESM

// @desc Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch services." });
  }
};

// @desc Add new service
export const createService = async (req, res) => {
  try {
    const { title, desc, icon } = req.body;
    const newService = await Service.create({ title, desc, icon });
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: "Failed to create service." });
  }
};

// @desc Update service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Service.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Service not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update service." });
  }
};

// @desc Delete service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete service." });
  }
};
