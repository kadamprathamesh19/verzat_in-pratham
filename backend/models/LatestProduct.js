import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const latestProductSchema = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: { type: [String], default: [] },
  link: { type: String, required: true },
}, { timestamps: true });

export default model('LatestProduct', latestProductSchema);
