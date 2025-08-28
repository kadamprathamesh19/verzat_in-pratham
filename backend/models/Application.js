// models/Application.js
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    resumeUrl: {
        type: String, // Can be local path or Cloudinary URL
        required: true,
    },
}, {
    timestamps: true
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;
