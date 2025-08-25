import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    icon: { type: String }, // store icon name like "FaBrain"
  },
  { timestamps: true }
);

const ServiceContent =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default ServiceContent;
