import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  pageTitle: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  mapEmbedUrl: { type: String, required: true },
}, {
  timestamps: true,
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
