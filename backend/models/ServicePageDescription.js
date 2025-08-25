import mongoose from "mongoose";

const servicePageDescriptionSchema = new mongoose.Schema({
  title: { type: String, required: false }, // <-- New field
  description: { type: String, required: true },
});

const ServicePageDescription =
  mongoose.models.ServicePageDescription ||
  mongoose.model("ServicePageDescription", servicePageDescriptionSchema);

export default ServicePageDescription;
