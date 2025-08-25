import mongoose from 'mongoose';

const BaseDescriptionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const BaseDescription = mongoose.models.BaseDescription || mongoose.model('BaseDescription', BaseDescriptionSchema);

export default BaseDescription;
