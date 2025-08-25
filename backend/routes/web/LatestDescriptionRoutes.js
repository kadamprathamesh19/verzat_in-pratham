import express from 'express';
import multer from 'multer';
import cloudinary from '../../config/cloudinary.js';
import {
  getLatestDescription,
  updateLatestDescription,
} from '../../controllers/LatestDescriptionController.js';

const router = express.Router();
// Multer setup: memory storage for image
const storage = multer.memoryStorage();

// Image upload middleware with filter
const uploadImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, png, webp).'));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // max 10MB images
});


router.get('/', getLatestDescription);
router.put('/', updateLatestDescription); // expects title, image URL, description


// Upload image route
router.post('/upload', uploadImage.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image uploaded' });

    const stream = cloudinary.uploader.upload_stream(
      { folder: 'verzat/latest/images' },
      (error, result) => {
        if (error) {
          console.error('Cloudinary error:', error);
          return res.status(500).json({ message: 'Image upload failed' });
        }
        return res.status(200).json({ imageUrl: result.secure_url });
      }
    );

    stream.end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during image upload' });
  }
});

export default router;
