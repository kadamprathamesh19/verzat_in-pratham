// controllers/applicationController.js
import cloudinary from '../config/cloudinary.js';
import Application from '../models/Application.js';

export const submitApplication = async (req, res) => {
    try {
        const { name, email, contact, position } = req.body;

        if (!req.file) {
            console.error('Resume file missing.');
            return res.status(400).json({ message: 'Resume file is required' });
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'raw', // Required for PDFs
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

