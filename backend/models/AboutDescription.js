import mongoose from 'mongoose';

const aboutDescriptionSchema = new mongoose.Schema({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    default: '',
  },
});

export default mongoose.model('AboutDescription', aboutDescriptionSchema);
