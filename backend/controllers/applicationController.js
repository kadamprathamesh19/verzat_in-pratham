// controllers/applicationController.js
import cloudinary from '../config/cloudinary.js';
import Application from '../models/Application.js';

// --- 1. Submit Application (for Users) ---
export const submitApplication = async (req, res) => {
    try {
        const { name, email, contact, position } = req.body;

        if (!req.file) {
            console.error('Resume file missing.');
            return res.status(400).json({ message: 'Resume file is required' });
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'raw',
                folder: 'resumes',
            },
            async (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return res.status(500).json({ message: 'Cloudinary upload failed' });
                }

                try {
                    const application = new Application({
                        name,
                        email,
                        contact,
                        position,
                        resumeUrl: result.secure_url,
                    });

                    await application.save();
                    return res.status(201).json({ message: 'Application submitted successfully' });
                } catch (dbError) {
                    console.error('MongoDB save error:', dbError);
                    return res.status(500).json({ message: 'Database error' });
                }
            }
        );

        uploadStream.end(req.file.buffer);
    } catch (error) {
        console.error('Unexpected server error:', error);
        res.status(500).json({ message: 'Unexpected server error' });
    }
};



// --- 2. Get All Applications (for Admin) ---
export const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 });
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Failed to fetch applications' });
    }
};


// --- 3. Delete Application by ID (for Admin) ---
export const deleteApplication = async (req, res) => {
    const { id } = req.params;
    try {
        const application = await Application.findByIdAndDelete(id);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        console.error('Error deleting application:', error);
        res.status(500).json({ message: 'Failed to delete application' });
    }
};
