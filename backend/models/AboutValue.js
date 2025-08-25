// models/AboutValue.js
import mongoose from 'mongoose';

const aboutValueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true }, // Cloudinary URL
});

export default mongoose.model('AboutValue', aboutValueSchema);
