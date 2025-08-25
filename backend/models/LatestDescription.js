import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const latestDescriptionSchema = new Schema(
  {
    sectionTitle: { type: String, default: '' },
    sectionImage: { type: String, default: '' }, // Cloudinary URL
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default model('LatestDescription', latestDescriptionSchema);
