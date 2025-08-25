import mongoose from 'mongoose';

const BaseCompanyProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  longform: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Cloudinary URL
}, { timestamps: true });

const BaseCompanyProduct = mongoose.models.BaseCompanyProduct || mongoose.model('BaseCompanyProduct', BaseCompanyProductSchema);

export default BaseCompanyProduct;
